import ThreadRepository from '../../../threads/ThreadRepository'
import CommentRepository from '../../../comment/CommentRepository'
import ReplyRepository from '../../ReplyRepository'
import DeleteReplyAggregate from './DeleteReplyAggregate'

class DeleteReplyFactory {
    private threadRepository: ThreadRepository;
    private commentRepository: CommentRepository;
    private replyRepository: ReplyRepository;
    constructor (threadRepository: ThreadRepository, commentRepository: CommentRepository, replyRepository: ReplyRepository) {
      this.threadRepository = threadRepository
      this.commentRepository = commentRepository
      this.replyRepository = replyRepository
    }

    async create (userId: string, threadId: string, commentId: string, replyId: string) {
      const isThreadHasCreated = await this.threadRepository.isThreadHasCreated(threadId)
      const isCommentHasCreated = await this.commentRepository.isCommentHasCreated(commentId)
      const reply = await this.replyRepository.getReplyById(replyId)
      const deleteReplyAggregate = new DeleteReplyAggregate(isThreadHasCreated, isCommentHasCreated, reply, userId)
      return deleteReplyAggregate.delete(replyId)
    }
}

export default DeleteReplyFactory
