// shared/lib/payment-service.ts

import axios from "axios";

export interface PayUProduct {
  name: string;
  unitPrice: string;
  quantity: string;
  colorVariant: {
    colorName: string;
    imageUrl: string;
  };
  switch: {
    name: string;
    type: string;
  }
}

interface CreatePaymentProps {
  amount: number;
  orderId: string;
  description: string;
  products: PayUProduct[];
  customerIp: string;
  buyerEmail?: string;
  buyerFirstName?: string;
  buyerLastName?: string;
}

interface PayUAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface PayUOrderResponse {
  status: {
    statusCode: string;
  };
  redirectUri: string;
  orderId: string;
  extOrderId?: string;
}

// PayU OAuth Token
async function getPayUAccessToken(): Promise<string> {
  try {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PAYU_CLIENT_ID as string,
      client_secret: process.env.PAYU_CLIENT_SECRET as string,
    });

    const { data } = await axios.post<PayUAuthResponse>(
      "https://secure.snd.payu.com/pl/standard/user/oauth/authorize",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("PayU authentication failed:", error.response?.status);
    }
    throw new Error("Failed to authenticate with PayU");
  }
}

// Create PayU Payment
export async function createPayment(details: CreatePaymentProps) {
  try {
    const accessToken = await getPayUAccessToken();

    const notifyUrl = process.env.PAYU_NOTIFY_URL || `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback`;

    const orderData = {
      customerIp: details.customerIp,
      merchantPosId: process.env.PAYU_POS_ID as string,
      description: details.description,
      currencyCode: "CZK",
      totalAmount: details.amount.toString(),
      products: details.products,
      buyer: details.buyerEmail
        ? {
            email: details.buyerEmail,
            firstName: details.buyerFirstName,
            lastName: details.buyerLastName,
          }
        : undefined,
      extOrderId: details.orderId.toString(),
      notifyUrl: notifyUrl,
    };

    const { data } = await axios.post<PayUOrderResponse>(
      "https://secure.snd.payu.com/api/v2_1/orders", 
      orderData, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        maxRedirects: 0,
        validateStatus: function (status) {
          return status < 400;
        },
      }
    );

    if (data.status.statusCode === "SUCCESS" && data.redirectUri) {
      return {
        paymentId: data.orderId,
        redirectUri: data.redirectUri,
        statusCode: data.status.statusCode,
      };
    } else {
      throw new Error(`Payment creation failed: ${data.status.statusCode}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("PayU payment creation failed:", error.response?.status);
    }
    throw new Error("Failed to create payment");
  }
}