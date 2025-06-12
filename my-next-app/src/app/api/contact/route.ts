import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Placeholder - replace with your actual secret key from Google reCAPTCHA admin
// IMPORTANT: Store this in environment variables in a real application
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || "YOUR_RECAPTCHA_SECRET_KEY_PLACEHOLDER";

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET_KEY || RECAPTCHA_SECRET_KEY === "YOUR_RECAPTCHA_SECRET_KEY_PLACEHOLDER") {
    console.warn("reCAPTCHA secret key is not set or is a placeholder. Skipping verification for development.");
    // In a development environment, you might want to bypass verification.
    // For production, this should always return false or throw an error if the key is missing.
    return true; // Or false if you want to enforce it even with placeholders
  }

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`;

  try {
    const response = await fetch(verificationUrl, { method: 'POST' });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}


export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, recaptchaToken } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ message: 'Missing required form fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (!recaptchaToken) {
      return new Response(JSON.stringify({ message: 'reCAPTCHA token is missing' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return new Response(JSON.stringify({ message: 'reCAPTCHA verification failed' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }

    // Configure Nodemailer (use environment variables for sensitive data in a real app)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com', // Placeholder
      port: Number(process.env.SMTP_PORT) || 587,       // Placeholder
      secure: process.env.SMTP_SECURE === 'true' || false,
      auth: {
        user: process.env.SMTP_USER || 'your-email@example.com', // Placeholder
        pass: process.env.SMTP_PASS || 'your-password',          // Placeholder
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER || 'your-email@example.com'}>`, // Sender address shown in mail client
      replyTo: email, // Actual sender email for replies
      to: 'ward.pellegrims@gmail.com', // Recipient address
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // For testing Nodemailer without actual email sending (e.g. using Ethereal)
    if (process.env.NODE_ENV !== 'production' && process.env.SMTP_HOST === 'smtp.example.com') {
        console.log("Nodemailer is using placeholder SMTP details. Email would be sent with actual credentials.");
        // In a real test/dev scenario with Ethereal, you'd await transporter.sendMail()
        // and log the preview URL. For now, we'll simulate success if reCAPTCHA was okay.
        return new Response(JSON.stringify({ message: 'Email sent successfully! (Simulated due to placeholder SMTP)' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    try {
      await transporter.sendMail(mailOptions);
      return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.error('Error sending email:', error);
      const errorMessage = error instanceof Error ? error.message : 'Internal server error sending email';
      return new Response(JSON.stringify({ message: 'Error sending email', error: errorMessage }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

  } catch (error) {
    console.error('Error processing request:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(JSON.stringify({ message: 'Error processing request', error: errorMessage }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
