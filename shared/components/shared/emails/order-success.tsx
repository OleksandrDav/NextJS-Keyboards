// shared/components/shared/emails/order-success.tsx

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';

interface OrderSuccessTemplateProps {
  orderId: string;
  customerName: string;
  totalAmount: string;
  items: any[];
}

export const OrderSuccessTemplate = ({
  orderId,
  customerName,
  totalAmount,
  items,
}: OrderSuccessTemplateProps) => (
  <Html>
    <Head />
    <Preview>Your payment was successful!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🎉 Payment Successful!</Heading>
        
        <Text style={text}>
          Hi {customerName},
        </Text>
        
        <Text style={text}>
          Thank you for your payment! Your order <strong>#{orderId}</strong> has been confirmed and is now being processed.
        </Text>

        <Section style={orderDetails}>
          <Text style={orderDetailsTitle}>Order Details:</Text>
          <Hr style={hr} />
          
          {items.map((item: any, index: number) => (
            <div key={index} style={itemRow}>
              <Text style={itemText}>
                {item.keyboard?.title || 'Product'} x {item.quantity}
              </Text>
            </div>
          ))}
          
          <Hr style={hr} />
          <Text style={totalText}>
            <strong>Total Amount:</strong> {totalAmount} CZK
          </Text>
        </Section>

        <Text style={text}>
          We'll send you another email once your order has been shipped.
        </Text>

        <Text style={footer}>
          Best regards,<br />
          Your Store Team
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  padding: '0 40px',
};

const orderDetails = {
  margin: '32px 40px',
  padding: '24px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
};

const orderDetailsTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
  margin: '0 0 16px 0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '16px 0',
};

const itemRow = {
  margin: '8px 0',
};

const itemText = {
  fontSize: '14px',
  color: '#555',
  margin: '4px 0',
};

const totalText = {
  fontSize: '16px',
  color: '#333',
  margin: '16px 0 0 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '32px 0 0 0',
  padding: '0 40px',
};