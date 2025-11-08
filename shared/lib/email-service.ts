
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import React from 'react';

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com'
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  template: React.ReactElement
) => {
  try {
    // Render React component to email-optimized HTML
    const html = await render(template);
    
    // Send email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Your App" <noreply@yourapp.com>',
      to,
      subject,
      html,
    });

    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};