import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-respository"

interface submitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot? : string
}

export class SubmitFeedbackUseCase {
  constructor(
   private feedbaacksRepository: FeedbacksRepository,
   private mailAdapter : MailAdapter
  ) {}

  async execute(request: submitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    await this.feedbaacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do Feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src=${screenshot}>` : ``,
        `</div>`
      ].join('\n')
    })
  }
}