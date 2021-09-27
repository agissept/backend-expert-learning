import CommentRepository from '../../CommentRepository'
import ReplyRepository from '../../../replies/ReplyRepository'
import GetCommentsWithRepliesAggregate from './GetCommentsWithRepliesAggregate'

class GetCommentsWithRepliesFactory {
    private commentRepository: CommentRepository
    private replyRepository: ReplyRepository;

    constructor (commentRepository: CommentRepository, replyRepository: ReplyRepository) {
      this.replyRepository = replyRepository
      this.commentRepository = commentRepository
    }

    async create (threadId: string) {
      const comments = await this.commentRepository.getCommentsByThreadId(threadId)
      const commentIds: string[] = comments.map((comment) => comment.id)
      const replies = await this.replyRepository.getRepliesByCommentIds(commentIds)
      const getCommentsWithRepliesAggregate = new GetCommentsWithRepliesAggregate(replies, comments)
      return getCommentsWithRepliesAggregate.get()
    }
}

export default GetCommentsWithRepliesFactory
