import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'
import CommentRepository from '../../../Domains/comment/CommentRepository'
import ThreadRepository from '../../../Domains/threads/ThreadRepository'
import LikeCommentRepository from '../../../Domains/likes/LikeCommentRepository'
import LikeCommentFactory from '../../../Domains/likes/factory/LikeCommentFactory'

class LikeCommentUseCase {
    private readonly commentRepository: CommentRepository;
    private readonly threadRepository: ThreadRepository;
    private readonly likeCommentRepository: LikeCommentRepository;
    constructor ({ commentRepository, threadRepository, likeCommentRepository }: UseCaseConstructor) {
      this.commentRepository = commentRepository
      this.threadRepository = threadRepository
      this.likeCommentRepository = likeCommentRepository
    }

    async execute (userId: string, threadId: string, commentId: string) {
      const likeCommentFactory = new LikeCommentFactory(this.commentRepository, this.threadRepository, this.likeCommentRepository)
      const likeComment = await likeCommentFactory.create(userId, commentId, threadId)
      if (likeComment.isLiked) {
        await this.likeCommentRepository.unlikeComment(likeComment)
      } else {
        await this.likeCommentRepository.likeComment(likeComment)
      }
    }
}

export default LikeCommentUseCase
