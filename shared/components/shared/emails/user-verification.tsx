// shared/components/shared/emails/order-confirmation.tsx

interface UserVerificationProps {
  code: string;
}

export const UserVerification: React.FC<UserVerificationProps> = ({ code }) => (
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
        } `}</style>
    </head>
    <body>
      <p>
        Код подтверждения: <h2>{code}</h2>
      </p>

      <p>
        <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
      </p>
    </body>
  </html>
);
