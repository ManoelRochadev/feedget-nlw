import { MailAdapter } from '../adapters/mail-adapter'
import { FeedbacksRepository } from '../repositories/feedbacks-repository'
import juice from 'juice'

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    if (!type) {
      throw new Error('Type and comment are required')
    }

    if (!comment) {
      throw new Error('comment are required')
    }

   if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
     throw new Error('Invalid screenshot')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    const screenshotExists = () => screenshot ? `<a href="cid:screenshot">
    <img src="cid:screenshot" alt="imagem do feedback" width="300px"/>
   </a>` : ''

    const result = juice(`<style>
      table {
        border-collapse: collapse;
      }

      td {
        padding-bottom: 30px;
        padding-right: 0px;
        padding-left: 0px;
        padding-top: 40px;
        font-family: sans-serif;
        font-size: 16px;
        color: #a1a1aa;
        margin-top: 20px;
      }

      .title {
        font-size: 24px;
      }
    
    </style>  
        <body>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#18181b">
        <tr>
         <td align="center" class="title">
          Tipo de feedback ${type}
         </td>
        <tr>
         <td align="center">
          comentario ${comment}
         </td>
        <tr>
         <td align="center">
         ${screenshotExists()}
         </td>
        </tr>
       </table>
        </body>
    `)

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
       <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Demystifying Email Design</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      ${result}
      </html>
      `].join(),
      screenshot
    })
  }
}
