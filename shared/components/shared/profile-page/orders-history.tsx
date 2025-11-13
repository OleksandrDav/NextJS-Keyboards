"use client";

import React from "react";
import { Order, OrderStatus, PaymentStatus } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { formatDate } from "@/shared/lib/format-date";
import Image from "next/image";
import { Title } from "../title";

interface Props {
  orders: Order[];
}

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

const paymentStatusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  SUCCEEDED: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

export const OrdersHistory: React.FC<Props> = ({ orders }) => {
  console.log("Orders data:", orders);
  
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">You haven't placed any orders yet</p>
        <p className="text-gray-400 mt-2">Your orders will appear here once you make a purchase</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Title text="Your Orders" size="md" className="font-bold" />
      
      <div className="space-y-4">
        {orders.map((order) => {
          let items = [];
          try {
            items = typeof order.items === 'string' 
              ? JSON.parse(order.items) 
              : Array.isArray(order.items) 
                ? order.items 
                : [];
          } catch (error) {
            console.error('Error parsing order items:', error);
            items = [];
          }
          
          return (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge className={statusColors[order.status as OrderStatus]}>
                      {order.status}
                    </Badge>
                    <Badge className={paymentStatusColors[order.paymentStatus as PaymentStatus]}>
                      Payment: {order.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <p className="text-sm font-semibold mb-4 text-gray-900">Items ({items.length})</p>
                    <div className="space-y-4">
                      {items.length > 0 ? (
                        items.map((item: any, index: number) => {
                          const itemTotalPrice = (parseFloat(item.calculatedPrice || "0") * item.quantity).toFixed(2);
                          const originalPrice = parseFloat(item.keyboard?.basePrice || "0");
                          const discountPercentage = item.keyboard?.discountPercentage || 0;
                          const hasDiscount = discountPercentage > 0;
                          
                          return (
                            <div key={item.id || index} className="flex gap-4 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                              {/* Product Image */}
                              <div className="flex-shrink-0">
                                <Image
                                  src={item.colorVariant?.imageUrl || "/placeholder-keyboard.jpg"}
                                  alt={item.keyboard?.name || "Keyboard"}
                                  width={80}
                                  height={80}
                                  className="rounded-md object-cover border"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/placeholder-keyboard.jpg";
                                  }}
                                />
                              </div>
                              
                              {/* Product Details */}
                              <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {item.keyboard?.name || "Keyboard"}
                                    </h4>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {/* Color Badge */}
                                      {item.colorVariant?.colorName && (
                                        <div className="flex items-center gap-1 text-xs">
                                          <div 
                                            className="w-3 h-3 rounded-full border"
                                            style={{ backgroundColor: item.colorVariant.colorHex }}
                                          />
                                          <span className="text-gray-600">{item.colorVariant.colorName}</span>
                                        </div>
                                      )}
                                      
                                      {/* Switch Badge */}
                                      {item.switch?.name && (
                                        <Badge variant="outline" className="text-xs">
                                          {item.switch.name}
                                        </Badge>
                                      )}
                                      
                                      {/* Quantity Badge */}
                                      <Badge variant="secondary" className="text-xs">
                                        Qty: {item.quantity}
                                      </Badge>
                                    </div>
                                    
                                    {/* Price Details */}
                                    <div className="flex items-center gap-2 mt-2">
                                      <span className="font-semibold text-gray-900">
                                        ${itemTotalPrice}
                                      </span>
                                      {hasDiscount && (
                                        <>
                                          <span className="text-sm text-gray-500 line-through">
                                            ${originalPrice.toFixed(2)}
                                          </span>
                                          <Badge className="bg-green-100 text-green-800 text-xs">
                                            {discountPercentage}% OFF
                                          </Badge>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Unit Price */}
                                  <div className="text-right text-sm text-gray-500">
                                    ${parseFloat(item.calculatedPrice || "0").toFixed(2)} each
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8 border rounded-lg bg-gray-50">
                          <p className="text-gray-500">No items found in this order</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="border-t pt-6">
                    <p className="text-sm font-semibold mb-3 text-gray-900">Shipping Address</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">{order.firstName} {order.lastName}</span><br />
                        {order.address}<br />
                        {order.city}, {order.zipCode}<br />
                        📞 {order.phone}
                      </p>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg">
                      <div>
                        <span className="font-semibold text-gray-900">Order Total</span>
                        <p className="text-sm text-gray-500 mt-1">
                          {items.length} item{items.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${order.totalAmount.toString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};