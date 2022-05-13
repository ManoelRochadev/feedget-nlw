import { MailAdapter, MailAdapterData } from "../mail-adapter";
import nodemailer from 'nodemailer'


const transport = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "manoelmelo367@gmail.com",
    pass: "8WkcYLCVHz3fgpKD"
  }
})

export class NodemailerMailAdapter implements MailAdapter {
async sendMail({subject, body, screenshot}: MailAdapterData) {
 await transport.sendMail({
    from: 'Feedback Feedget <oi@feedget.com>',
    to: 'Manoel Rocha <manoelmelo367@gmail.com>',
    subject,
    html: body,
    attachments: [{
      filename: 'screenshot.png',
      cid: 'screenshot',
      path: screenshot,
      content: (screenshot || ''),
      contentType: 'image/png'
    }]
  })

  console.log('Email enviado com sucesso')

}
}