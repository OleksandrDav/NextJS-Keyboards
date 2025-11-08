// templates/PayOrderTemplate.tsx
import React from 'react';

interface PayOrderProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<PayOrderProps> = ({ 
  orderId, 
  totalAmount, 
  paymentUrl 
}) => (
  <html>
    <body style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#333' }}>Заказ #{orderId}</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
          Оплатите заказ на сумму <b>{totalAmount} ₽</b>.
        </p>
        <p>
          <a 
            href={paymentUrl}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '4px',
              marginTop: '10px'
            }}
          >
            Оплатить заказ
          </a>
        </p>
      </div>
    </body>
  </html>
);