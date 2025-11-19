// shared/components/shared/emails/order-confirmation.tsx

interface OrderConfirmationProps {
  orderId?: string;
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    deliveryInstructions?: string | undefined;
  };
  paymentUrl?: string;
}

export const OrderConfirmationTemplate: React.FC<OrderConfirmationProps> = ({
  orderId,
  data,
  paymentUrl,
}) => (
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
        .info-icon {
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
        .customer-details {
          margin: 25px 0;
        }
        .customer-details h2 {
          color: #333;
          font-size: 20px;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #f0f0f0;
        }
        .detail-grid {
          display: table;
          width: 100%;
          border-collapse: collapse;
        }
        .detail-row {
          display: table-row;
        }
        .detail-label {
          display: table-cell;
          padding: 8px 15px 8px 0;
          font-weight: 600;
          color: #333;
          width: 35%;
          vertical-align: top;
        }
        .detail-value {
          display: table-cell;
          padding: 8px 0;
          color: #666;
          vertical-align: top;
        }
        .payment-section {
          background-color: #f0f8ff;
          border: 2px solid #1e90ff;
          border-radius: 8px;
          padding: 25px;
          margin: 30px 0;
          text-align: center;
        }
        .payment-section h2 {
          color: #1e90ff;
          margin: 0 0 15px 0;
          font-size: 22px;
        }
        .payment-section p {
          color: #666;
          margin: 0 0 20px 0;
          font-size: 16px;
        }
        .payment-button {
          display: inline-block;
          background-color: #1e90ff;
          color: #ffffff;
          padding: 14px 32px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .payment-button:hover {
          background-color: #0077e6;
        }
        .instructions {
          margin: 25px 0;
          padding: 20px;
          background-color: #fff9e6;
          border-left: 4px solid #ffc107;
          border-radius: 4px;
        }
        .instructions h3 {
          color: #333;
          margin: 0 0 10px 0;
          font-size: 18px;
        }
        .instructions p {
          color: #666;
          margin: 8px 0;
          font-size: 14px;
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
        .urgent-note {
          color: #d9534f;
          font-weight: 600;
          margin: 15px 0;
          padding: 10px;
          background-color: #fdf2f2;
          border-radius: 4px;
          border-left: 4px solid #d9534f;
        }
        @media only screen and (max-width: 600px) {
          .container {
            padding: 25px 20px;
          }
          .detail-label, .detail-value {
            display: block;
            width: 100%;
            padding: 5px 0;
          }
          .payment-button {
            display: block;
            padding: 16px 24px;
          }
        }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <div className="info-icon">📝</div>
          <h1>Order Received!</h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Hello {data.firstName}, we've received your order
          </p>
        </div>

        <div className="order-info">
          <p><strong>Order ID:</strong> #{orderId}</p>
          <p><strong>Status:</strong> Awaiting Payment</p>
          <p><strong>Order Date:</strong> {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>

        <div className="customer-details">
          <h2>Delivery Information</h2>
          <div className="detail-grid">
            <div className="detail-row">
              <div className="detail-label">Name:</div>
              <div className="detail-value">{data.firstName} {data.lastName}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Email:</div>
              <div className="detail-value">{data.email}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Phone:</div>
              <div className="detail-value">{data.phone}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Address:</div>
              <div className="detail-value">
                {data.address}<br />
                {data.city}, {data.zipCode}
              </div>
            </div>
            {data.deliveryInstructions && (
              <div className="detail-row">
                <div className="detail-label">Delivery Instructions:</div>
                <div className="detail-value">{data.deliveryInstructions}</div>
              </div>
            )}
          </div>
        </div>

        <div className="payment-section">
          <h2>Complete Your Payment</h2>
          <p>Your order is pending. Please complete the payment to confirm your order.</p>
          {paymentUrl && (
            <a href={paymentUrl} className="payment-button">
              Pay Now
            </a>
          )}
        </div>

        <div className="urgent-note">
          ⚠️ Important: Your order will be processed only after successful payment.
        </div>

        <div className="instructions">
          <h3>What happens next?</h3>
          <p>1. Complete your payment using the button above</p>
          <p>2. You'll receive a confirmation email once payment is successful</p>
          <p>3. We'll start preparing your order for delivery</p>
          <p>4. You'll get tracking information when your order ships</p>
        </div>

        <div className="footer">
          <p>Thank you for choosing Next Keyboards!</p>
          <p>If you have any questions about your order, please contact our support team.</p>
          <p style={{ marginTop: '15px', color: '#999', fontSize: '12px' }}>
            This is an automated email. Please do not reply directly to this message.
          </p>
        </div>
      </div>
    </body>
  </html>
);