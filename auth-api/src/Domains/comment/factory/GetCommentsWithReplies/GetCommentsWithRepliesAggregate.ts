import ReplyDTO from '../../../replies/model/ReplyDTO'
import CommentDTO from '../../model/RepositoryModel/CommentDTO'
import CommentWithReplies from '../../model/DomainModel/CommentWithReplies'
import LikedCommentsCount from '../../../likes/model/LikedCommentsCount'

class GetCommentsWithRepliesAggregate {
  private replies: ReplyDTO[];
  private comments: CommentDTO[];
  private commentsLikeCount: LikedCommentsCount[];
  constructor (replies: ReplyDTO[], comments: CommentDTO[], commentsLikeCount: LikedCommentsCount[]) {
    this.replies = replies
    this.comments = comments
    this.commentsLikeCount = commentsLikeCount
  }

  get (): CommentWithReplies[] {
    return this.comments.map((comment) => {
      return {
        id: comment.id,
        username: comment.username,
        date: comment.date,
        content: this.modifyCommentContent(comment.isDeleted, comment.content),
        likeCount: this.getLikeCount(comment.id),
        replies: this.replies.filter((reply) => reply.commentId === comment.id).map((reply) => ({
          id: reply.id,
          username: reply.username,
          date: reply.createdAt,
          content: this.modifyReplyContent(reply.isDeleted, reply.content)
        }))
      }
    })
  }

  getLikeCount (commentId: string): number {
    const likedCommentCount = this.commentsLikeCount.find(likeCount => likeCount.commentId === commentId)
    if (likedCommentCount !== undefined) {
      return likedCommentCount.likeCount
    }
    return 0
  }

  modifyReplyContent (idDeleted: boolean, content: string) {
    if (idDeleted) {
      return '**balasan telah dihapus**'
    }
    return content
  }

  modifyCommentContent (idDeleted: boolean, content: string) {
    if (idDeleted) {
      return '**komentar telah dihapus**'
    }
    return content
  }
}

export default GetCommentsWithRepliesAggregate
