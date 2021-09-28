import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'
import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import CommentRepository from '../../../Domains/comment/CommentRepository'
import ReplyRepository from '../../../Domains/replies/ReplyRepository'
import NewReplyFactory from '../../../Domains/replies/factory/NewReply/NewReplyFactory'
import AddedReply from '../../../Domains/replies/model/AddedReply'
import ThreadRepository from '../../../Domains/threads/ThreadRepository'

class AddReplyUseCase {
  private readonly commentRepository: CommentRepository
  private readonly threadRepository: ThreadRepository;
  private replyRepository: ReplyRepository

  constructor ({ commentRepository, replyRepository, threadRepository }: UseCaseConstructor) {
    this.commentRepository = commentRepository
    this.replyRepository = replyRepository
    this.threadRepository = threadRepository
  }

  async execute (payload: UnvalidatedPayload, userId: string, commentId: string, threadId: string): Promise<AddedReply> {
    const factory = new NewReplyFactory(this.commentRepository, this.threadRepository)
    const newReply = await factory.create(payload, userId, commentId, threadId)
    const replyId = await this.replyRepository.addReply(newReply)
    return {
      id: replyId,
      content: newReply.content,
      owner: newReply.userId
    }
  }
}

export default AddReplyUseCase
