import CommentRepository from '../../comment/CommentRepository'
import LikeCommentRepository from '../LikeCommentRepository'
import ThreadRepository from '../../threads/ThreadRepository'
import LikeComment from '../model/LikeComment'

class LikeCommentFactory {
    private commentRepository: CommentRepository;
    private threadRepository: ThreadRepository;
    private likeCommentRepository: LikeCommentRepository;
    constructor (commentRepository: CommentRepository, threadRepository: ThreadRepository, likeCommentRepository: LikeCommentRepository) {
      this.commentRepository = commentRepository
      this.threadRepository = threadRepository
      this.likeCommentRepository = likeCommentRepository
    }

    async create (userId: string, commentId: string, threadId: string): Promise<LikeComment> {
      if (!await this.threadRepository.isThreadHasCreated(threadId)) {
        throw new Error('NEW_REPLY.THREAD_ID_IS_INVALID')
      }

      if (!await this.commentRepository.isCommentHasCreated(commentId)) {
        throw new Error('NEW_REPLY.COMMENT_ID_IS_INVALID')
      }

      return {
        userId,
        commentId
      }
    }
}

export default LikeCommentFactory
