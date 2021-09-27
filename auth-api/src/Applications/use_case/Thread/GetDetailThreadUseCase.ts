import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import ThreadRepository from '../../../Domains/threads/ThreadRepository'
import GetDetailThreadFactory from '../../../Domains/threads/factory/GetDetailThread/GetDetailThreadFactory'
import CommentRepository from '../../../Domains/comment/CommentRepository'
import ReplyRepository from '../../../Domains/replies/ReplyRepository'

class GetDetailThreadUseCase {
  private readonly threadRepository: ThreadRepository;
  private readonly commentRepository: CommentRepository;
  private readonly replyRepository: ReplyRepository;

  constructor ({ threadRepository, commentRepository, replyRepository }: UnvalidatedPayload) {
    this.threadRepository = threadRepository
    this.commentRepository = commentRepository
    this.replyRepository = replyRepository
  }

  async execute (threadId: string) {
    const factory = new GetDetailThreadFactory(this.threadRepository, this.commentRepository, this.replyRepository)
    return await factory.create(threadId)
  }
}

export default GetDetailThreadUseCase
