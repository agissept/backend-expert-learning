import CommentRepository from '../../CommentRepository'
import ReplyRepository from '../../../replies/ReplyRepository'
import GetCommentsWithRepliesAggregate from './GetCommentsWithRepliesAggregate'
import LikeCommentRepository from '../../../likes/LikeCommentRepository'

class GetCommentsWithRepliesFactory {
    private commentRepository: CommentRepository
    private replyRepository: ReplyRepository;
    private likeCommentRepository: LikeCommentRepository;

    constructor (commentRepository: CommentRepository, replyRepository: ReplyRepository, likeCommentRepository: LikeCommentRepository) {
      this.replyRepository = replyRepository
      this.commentRepository = commentRepository
      this.likeCommentRepository = likeCommentRepository
    }

    async create (threadId: string) {
      const comments = await this.commentRepository.getCommentsByThreadId(threadId)
      const commentIds: string[] = comments.map((comment) => comment.id)
      const replies = await this.replyRepository.getRepliesByCommentIds(commentIds)
      const commentsLikeCount = await this.likeCommentRepository.getLikeCountCommentsByCommentIds(commentIds)
      const getCommentsWithRepliesAggregate = new GetCommentsWithRepliesAggregate(replies, comments, commentsLikeCount)
      return getCommentsWithRepliesAggregate.get()
    }
}

export default GetCommentsWithRepliesFactory
