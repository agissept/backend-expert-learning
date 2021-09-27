import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'
import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import CommentRepository from '../../../Domains/comment/CommentRepository'
import ReplyRepository from '../../../Domains/replies/ReplyRepository'
import NewReplyFactory from '../../../Domains/replies/factory/NewReply/NewReplyFactory'
import AddedReply from '../../../Domains/replies/model/AddedReply'

class AddReplyUseCase {
  private readonly commentRepository: CommentRepository
  private replyRepository: ReplyRepository

  constructor ({ commentRepository, replyRepository }: UseCaseConstructor) {
    this.commentRepository = commentRepository
    this.replyRepository = replyRepository
  }

  async execute (payload: UnvalidatedPayload, userId: string, commentId: string): Promise<AddedReply> {
    const factory = new NewReplyFactory(this.commentRepository)
    const newReply = await factory.create(payload, userId, commentId)
    const replyId = await this.replyRepository.addReply(newReply)
    return {
      id: replyId,
      content: newReply.content,
      owner: newReply.userId
    }
  }
}

export default AddReplyUseCase
