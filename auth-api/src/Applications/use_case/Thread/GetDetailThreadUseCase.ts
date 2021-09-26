import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import ThreadRepository from '../../../Domains/threads/ThreadRepository'
import GetDetailThreadFactory from '../../../Domains/threads/entities/GetDetailThread/GetDetailThreadFactory'
import CommentRepository from '../../../Domains/comment/CommentRepository'

class GetDetailThreadUseCase {
  private readonly threadRepository: ThreadRepository;
  private readonly commentRepository: CommentRepository;

  constructor ({ threadRepository, commentRepository }: UnvalidatedPayload) {
    this.threadRepository = threadRepository
    this.commentRepository = commentRepository
  }

  async execute (threadId: string) {
    const factory = new GetDetailThreadFactory(this.threadRepository, this.commentRepository)
    return await factory.create(threadId)
  }
}

export default GetDetailThreadUseCase
