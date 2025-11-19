interface UserVerificationProps {
  code: string;
}

export const UserVerification: React.FC<UserVerificationProps> = ({ code }) => (
  <html>
    <head>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          background-color: #f4f7fa;
        }
        .email-container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
          text-align: center;
          color: #ffffff;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 18px;
          color: #333333;
          margin-bottom: 20px;
        }
        .message {
          font-size: 16px;
          color: #666666;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .code-container {
          background-color: #f8f9fa;
          border: 2px dashed #667eea;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          margin: 30px 0;
        }
        .code-label {
          font-size: 14px;
          color: #666666;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .code {
          font-size: 32px;
          font-weight: 700;
          color: #667eea;
          letter-spacing: 4px;
          font-family: 'Courier New', monospace;
        }
        .button-container {
          text-align: center;
          margin: 30px 0;
        }
        .verify-button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          text-decoration: none;
          padding: 16px 40px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          transition: transform 0.2s;
        }
        .verify-button:hover {
          transform: translateY(-2px);
        }
        .footer {
          background-color: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        .footer-text {
          font-size: 14px;
          color: #999999;
          margin: 5px 0;
        }
        .divider {
          height: 1px;
          background-color: #e9ecef;
          margin: 30px 0;
        }
      `}</style>
    </head>
    <body>
      <div className="email-container">
        <div className="header">
          <h1>✉️ Подтверждение регистрации</h1>
        </div>
        
        <div className="content">
          <p className="greeting">Здравствуйте!</p>
          
          <p className="message">
            Спасибо за регистрацию! Для завершения процесса регистрации, 
            пожалуйста, подтвердите свой email адрес.
          </p>
          
          <div className="code-container">
            <div className="code-label">Ваш код подтверждения</div>
            <div className="code">{code}</div>
          </div>
          
          <p className="message">
            Вы можете ввести этот код на странице регистрации или просто 
            нажать на кнопку ниже:
          </p>
          
          <div className="button-container">
            <a 
              href={`http://localhost:3000/api/auth/verify?code=${code}`}
              className="verify-button"
            >
              Подтвердить регистрацию
            </a>
          </div>
          
          <div className="divider"></div>
          
          <p className="message" style={{ fontSize: '14px', color: '#999999' }}>
            Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.
          </p>
        </div>
        
        <div className="footer">
          <p className="footer-text">© 2024 Ваша Компания. Все права защищены.</p>
          <p className="footer-text">Это автоматическое письмо, не отвечайте на него.</p>
        </div>
      </div>
    </body>
  </html>
);