import * as nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'matheusmendesreis@gmail.com',
        pass: 'Mr310519',
        // user: process.env.OUTLOOK_USER,
        // pass: process.env.OUTLOOK_PASSWORD,
      },
    });
  }

  public async sendEmail(
    to: string,
    subject: string,
    text: string
  ): Promise<string> {
    try {
      const mailOptions = {
        from: 'matheusmendesreis@gmail.com',
        to,
        subject,
        text,
      };

      await this.transporter.sendMail(mailOptions);

      return `E-mail enviado com sucesso para, ${to}`;
    } catch (error) {
      return `error ${error}`;
    }
  }
}

export default EmailService;
