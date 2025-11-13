// app/api/payment/callback/route.ts

import { prisma } from '@/prisma/prisma-client';
import { sendEmail } from '@/shared/lib/email-service';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import React from 'react';
import { OrderSuccessTemplate } from '@/shared/components/shared/emails/order-success';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';

interface PayUNotification {
  order: {
    orderId: string;
    extOrderId: string;
    orderCreateDate: string;
    notifyUrl: string;
    customerIp: string;
    merchantPosId: string;
    description: string;
    currencyCode: string;
    totalAmount: string;
    buyer?: {
      email: string;
      phone?: string;
      firstName: string;
      lastName: string;
    };
    products: Array<{
      name: string;
      unitPrice: string;
      quantity: string;
      colorVariant?: {
        colorName: string;
        imageUrl: string;
      };
      switch?: {
        name: string;
        type: string;
      };
    }>;
    status: string;
  };
  localReceiptDateTime?: string;
  properties?: any[];
}

// Verify PayU signature
function verifyPayUSignature(body: string, signature: string): boolean {
  const secondKey = process.env.PAYU_SECOND_KEY as string;
  
  if (!secondKey) {
    console.error('PayU callback: Second key not configured');
    return false;
  }
  
  // PayU signature format: algorithm=MD5;signature={hash}
  const signatureParts = signature.split(';');
  const signatureHash = signatureParts[1]?.replace('signature=', '');
  
  if (!signatureHash) {
    console.error('PayU callback: Invalid signature format');
    return false;
  }

  // Calculate expected signature: MD5(body + secondKey)
  const expectedSignature = crypto
    .createHash('md5')
    .update(body + secondKey)
    .digest('hex');

  return signatureHash === expectedSignature;
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('OpenPayu-Signature');
    const body = await req.text();
    
    // Verify signature for security
    if (signature) {
      if (!verifyPayUSignature(body, signature)) {
        if (process.env.NODE_ENV === 'production') {
          return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }
      }
    }

    const notification: PayUNotification = JSON.parse(body);
    const orderData = notification.order;

    // Find order by extOrderId (our order ID)
    const order = await prisma.order.findFirst({
      where: {
        id: orderData.extOrderId,
      },
    });

    if (!order) {
      console.error('PayU callback: Order not found:', orderData.extOrderId);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check payment status
    const isSucceeded = orderData.status === 'COMPLETED';
    const isFailed = orderData.status === 'CANCELED';
    const isPending = orderData.status === 'PENDING';

    // Determine new statuses
    const newOrderStatus = isSucceeded 
      ? OrderStatus.CONFIRMED 
      : isFailed 
      ? OrderStatus.CANCELLED 
      : order.status;
    
    const newPaymentStatus = isSucceeded 
      ? PaymentStatus.SUCCEEDED 
      : isFailed 
      ? PaymentStatus.FAILED 
      : isPending
      ? PaymentStatus.PENDING
      : order.paymentStatus;

    // Update order status
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: newOrderStatus,
        paymentStatus: newPaymentStatus,
      },
    });

    let items: CartItemDTO[];

    if (typeof order.items === 'string') {
      // If items is stored as a string, parse it
      items = JSON.parse(order.items) as CartItemDTO[];
    } else {
      // If items is already an object, use it directly
      items = order.items as unknown as CartItemDTO[];
    }
    // Send success email
    if (isSucceeded) {
      try {
        await sendEmail(
          order.email,
          `Next Pizza / Your order #${order.id} was successful 🎉`,
          React.createElement(OrderSuccessTemplate, {
            orderId: order.id,
            customerName: `${order.firstName} ${order.lastName}`,
            status: order.status,
            address: order.address,
            totalAmount: order.totalAmount.toFixed(2),
            items,
          })
        );
      } catch (emailError) {
        console.error('PayU callback: Failed to send email:', emailError);
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PayU callback error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Optional: Add GET endpoint to verify the route is accessible
export async function GET() {
  return NextResponse.json({ 
    message: 'PayU callback endpoint is active',
    timestamp: new Date().toISOString()
  });
}