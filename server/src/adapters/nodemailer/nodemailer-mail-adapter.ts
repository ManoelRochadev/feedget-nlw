import { MailAdapter, MailAdapterData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'f17e99ab8f67a3',
    pass: '0627b894d88c1a'
  }
})

export class NodemailerMailAdapter implements MailAdapter {
async sendMail({subject, body}: MailAdapterData) {
 await transport.sendMail({
    from: 'Feedback Feedget <oi@feedget.com>',
    to: 'Manoel Rocha <manoelmelo367@gmail.com>',
    subject,
    html: body,
  })

}
}