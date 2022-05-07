import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d31d9328ada8dc",
    pass: "7812982ed323c7"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Hamiceis Pereira <aceu@outlook.com.br>',
      subject,
      html: body,
    })
  }
}