import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import ThreadRepository from '../../../Domains/threads/ThreadRepository'
import GetDetailThreadFactory from '../../../Domains/threads/factory/GetDetailThread/GetDetailThreadFactory'
import CommentRepository from '../../../Domains/comment/CommentRepository'
import ReplyRepository from '../../../Domains/replies/ReplyRepository'
import LikeCommentRepository from '../../../Domains/likes/LikeCommentRepository'

class GetDetailThreadUseCase {
  private readonly threadRepository: ThreadRepository;
  private readonly commentRepository: CommentRepository;
  private readonly replyRepository: ReplyRepository;
  private readonly likeCommentRepository: LikeCommentRepository;

  constructor ({ threadRepository, commentRepository, replyRepository, likeCommentRepository }: UnvalidatedPayload) {
    this.threadRepository = threadRepository
    this.commentRepository = commentRepository
    this.replyRepository = replyRepository
    this.likeCommentRepository = likeCommentRepository
  }

  async execute (threadId: string) {
    const factory = new GetDetailThreadFactory(this.threadRepository, this.commentRepository, this.replyRepository, this.likeCommentRepository)
    return await factory.create(threadId)
  }
}

export default GetDetailThreadUseCase
