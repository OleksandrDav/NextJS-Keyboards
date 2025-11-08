interface OrderConfirmationProps {
  orderId?: string;
  customerName?: string;
  totalAmount?: string;
  items?: string;
  paymentUrl?: string;
}

export const OrderConfirmationTemplate: React.FC<OrderConfirmationProps> = ({
  orderId,
  customerName,
  totalAmount,
  items,
  paymentUrl,
}) => (
  <html>
    <body style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {!paymentUrl ? <p>No paymentUrl</p> : <p>Have paymentUrl</p>}
      {paymentUrl && (
        <div>
          <p>Please complete your payment by clicking the link below:</p>
          <a href={paymentUrl}>
            Pay Now
          </a>
        </div>
      )}
    </body>
  </html>
);
