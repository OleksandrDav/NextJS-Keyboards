// shared/components/shared/emails/order-success.tsx

import { CartItemDTO } from "@/shared/services/dto/cart.dto";

interface OrderSuccessTemplateProps {
  orderId: string;
  customerName: string;
  totalAmount: string;
  status: string;
  address: string;
  items: CartItemDTO[];
}

const calcCartItemPrice = (item: CartItemDTO): number => {
  const basePrice = Number(item.keyboard.basePrice);
  const switchModifier = Number(item.switch.priceModifier);
  const discountPercentage = item.keyboard.discountPercentage;

  const discountedBasePrice = basePrice * (1 - discountPercentage / 100);
  const pricePerItem = discountedBasePrice + switchModifier;
  const finalPrice = pricePerItem * item.quantity;

  return finalPrice;
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const OrderSuccessTemplate = ({ 
  orderId, 
  customerName, 
  status, 
  address, 
  totalAmount, 
  items 
}: OrderSuccessTemplateProps) => (
  <html>
    <head>
      <style>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 40px 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #1e90ff;
          margin: 0 0 10px 0;
          font-size: 28px;
        }
        .success-icon {
          font-size: 48px;
          margin-bottom: 10px;
        }
        .order-info {
          background-color: #f9f9f9;
          border-left: 4px solid #1e90ff;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .order-info p {
          margin: 8px 0;
        }
        .order-info strong {
          color: #333;
        }
        .items-section {
          margin: 30px 0;
        }
        .items-section h2 {
          color: #333;
          font-size: 20px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f0f0f0;
        }
        .item {
          padding: 15px 0;
          border-bottom: 1px solid #f0f0f0;
          overflow: hidden;
        }
        .item:last-child {
          border-bottom: none;
        }
        .item-image {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          float: left;
          margin-right: 15px;
        }
        .item-details {
          overflow: hidden;
          margin-bottom: 8px;
        }
        .item-name {
          font-weight: 600;
          color: #333;
          margin: 0 0 8px 0;
          font-size: 16px;
        }
        .item-specs {
          color: #666;
          font-size: 14px;
          margin: 4px 0;
          line-height: 1.4;
        }
        .item-price {
          font-weight: 600;
          color: #1e90ff;
          font-size: 16px;
          float: right;
          margin-left: 15px;
        }
        .item-meta {
          overflow: hidden;
          clear: both;
        }
        .total-section {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #f0f0f0;
          text-align: right;
        }
        .total-section p {
          font-size: 20px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }
        .total-section .amount {
          color: #1e90ff;
          font-size: 24px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .footer p {
          margin: 5px 0;
        }
        .clearfix {
          clear: both;
        }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <div className="success-icon">🎉</div>
          <h1>Order Confirmed!</h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Thank you for your order, {customerName}
          </p>
        </div>

        <div className="order-info">
          <p><strong>Order ID:</strong> #{orderId}</p>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Delivery Address:</strong> {address}</p>
        </div>

        <div className="items-section">
          <h2>Order Items</h2>
          {items.map((item, index) => {
            const price = calcCartItemPrice(item);
            const details = `${item.switch.name} - ${item.switch.type} - ${item.colorVariant.colorName}`;
            const truncatedDetails = truncateText(details, 30);

            return (
              <div key={index} className="item">
                <img 
                  src={item.colorVariant.imageUrl} 
                  alt={item.keyboard.name}
                  className="item-image"
                />
                <div className="item-details">
                  <p className="item-name">{item.keyboard.name}</p>
                  <p className="item-specs">{truncatedDetails}</p>
                </div>
                <div className="item-price">${price.toFixed(2)}</div>
                <div className="item-meta">
                  <p className="item-specs">Quantity: {item.quantity}</p>
                </div>
                <div className="clearfix"></div>
              </div>
            );
          })}
        </div>

        <div className="total-section">
          <p>
            Total: <span className="amount">${totalAmount}</span>
          </p>
        </div>

        <div className="footer">
          <p>Thank you for choosing Next Keyboards!</p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p style={{ marginTop: '15px', color: '#999', fontSize: '12px' }}>
            This is an automated email. Please do not reply.
          </p>
        </div>
      </div>
    </body>
  </html>
);