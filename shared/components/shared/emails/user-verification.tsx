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
        .company-info {
          font-size: 13px;
          color: #666666;
          margin: 8px 0;
          line-height: 1.5;
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
          <h1>✉️ Registration Confirmation</h1>
        </div>
        
        <div className="content">
          <p className="greeting">Hello!</p>
          
          <p className="message">
            Thank you for registering! To complete the registration process, 
            please confirm your email address.
          </p>
          
          <div className="code-container">
            <div className="code-label">Your verification code</div>
            <div className="code">{code}</div>
          </div>
          
          <p className="message">
            You can enter this code on the registration page or simply 
            click the button below:
          </p>
          
          <div className="button-container">
            <a 
              href={`http://localhost:3000/api/auth/verify?code=${code}`}
              className="verify-button"
            >
              Verify Registration
            </a>
          </div>
          
          <div className="divider"></div>
          
          <p className="message" style={{ fontSize: '14px', color: '#999999' }}>
            If you did not register on our website, please ignore this email.
          </p>
        </div>
        
        <div className="footer">
          <p className="footer-text" style={{ fontWeight: '600', color: '#333333' }}>Next Keyboards</p>
          <p className="company-info">
            Next Keyboards s.r.o.<br />
            Hlavní 123, 110 00 Praha 1<br />
            Czech Republic
          </p>
          <p className="company-info">
            Email: support@nextkeyboards.com | Phone: +420 123 456 789
          </p>
          <p className="footer-text" style={{ marginTop: '15px' }}>
            © 2024 Next Keyboards. All rights reserved.
          </p>
          <p className="footer-text">This is an automated email, please do not reply.</p>
        </div>
      </div>
    </body>
  </html>
);