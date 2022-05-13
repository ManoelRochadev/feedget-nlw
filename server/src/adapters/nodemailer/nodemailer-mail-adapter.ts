import { MailAdapter, MailAdapterData } from "../mail-adapter";
import nodemailer from 'nodemailer'


const transport = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.PASSWORD
  }
})

export class NodemailerMailAdapter implements MailAdapter {
async sendMail({subject, body, screenshot}: MailAdapterData) {
 await transport.sendMail({
    from: 'Feedback Feedget <manoelmelo367@gmail.com>',
    to: 'Manoel Rocha <manoelsec01@gmail.com>',
    subject,
    html: body,
    attachments: [{
      filename: 'screenshot.png',
      cid: 'screenshot',
      path: screenshot || '',
      content: (screenshot || ''),
      contentType: 'image/png'
    }]
  })

  console.log('Email enviado com sucesso')

}
}