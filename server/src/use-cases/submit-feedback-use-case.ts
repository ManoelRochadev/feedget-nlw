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
        ` <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
      <style type="text/css">
      body {
        font-family: Roboto, sans-serif;
        font-size: 16px;
        color: #f4f4f5;
        background-color: #18181b;
      }
          
      div {
        align-items: center;
        display: flex;
        justify-content: center;
        display: flex;
        flex-direction: column;
      }
        h1 {
          font-size: 32px
        }
        
      p {
        font-size: 16px;
         margin-top: 0px;
        color: #a1a1aa;
      }

      img {
        height: auto;
        width: auto;
      }

      </style>
      <title>Email</title>
      </head>
      <body>
      <div>
      <h1>Feedback ${type}</h1>
      <p>Comentário ${comment}</p>
      <img src="${screenshot}"/>
      </div>
       </body>
      </html>`
      ].join('\n')
    })
  }
}
