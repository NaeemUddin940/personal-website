import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter: Transporter<SMTPTransport.SentMessageInfo> =
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "trackodata@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  });

// Define an interface for better readability
interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  text: string;
}

export default async function sendEmail({
  email,
  subject,
  template,
  text,
}: EmailOptions): Promise<SMTPTransport.SentMessageInfo> {
  return await transporter.sendMail({
    from: '"Personal Project" <trackodata@gmail.com>',
    to: email,
    subject,
    html: template,
    text: text,
  });
}
