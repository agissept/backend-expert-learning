import CommentRepository from '../../CommentRepository'
import ThreadRepository from '../../../threads/ThreadRepository'
import DeleteCommentAggregate from './DeleteCommentAggregate'

class DeleteCommentFactory {
    private threadRepository: ThreadRepository
    private commentRepository: CommentRepository

    constructor (threadRepository: ThreadRepository, commentRepository: CommentRepository) {
      this.threadRepository = threadRepository
      this.commentRepository = commentRepository
    }

    async create (userId: string, threadId: string, commentId: string) {
      const isThreadHasCreated = await this.threadRepository.isThreadHasCreated(threadId)
      const detailComment = await this.commentRepository.getDetailComment(commentId)

      const deleteComment = new DeleteCommentAggregate(isThreadHasCreated, detailComment, userId)
      return deleteComment.delete(commentId)
    }
}

export default DeleteCommentFactory
