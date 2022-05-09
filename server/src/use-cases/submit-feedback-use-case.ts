import { MailAdapter } from '../adapters/mail-adapter'
import { FeedbacksRepository } from '../repositories/feedbacks-repository'

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

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
        `<style type="text/css">
        body {
          font-family: sans-serif;
          font-size: 16px;
          color: #111;
        }
        div {
          align-items: center;
          display: flex;
          justify-content: center;
        }
  
        img {
          width: 700px;
          height: 500px;
        }`,
        `</style>`,
        `<title>Email</title>
        </head>
        <body>`,
        `<div>`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot
          ? `<img src="${screenshot}" style="height: 700px; width: 1000px" />`
          : '',
        `</div>`,
        ` </body>
        </html>`
      ].join('\n')
    })
  }
}
