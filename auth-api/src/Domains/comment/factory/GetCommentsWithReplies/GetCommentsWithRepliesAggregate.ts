import ReplyDTO from '../../../replies/model/ReplyDTO'
import CommentDTO from '../../model/RepositoryModel/CommentDTO'
import CommentWithReplies from '../../model/DomainModel/CommentWithReplies'

class GetCommentsWithRepliesAggregate {
  private replies: ReplyDTO[];
  private comments: CommentDTO[];
  constructor (replies: ReplyDTO[], comments: CommentDTO[]) {
    this.replies = replies
    this.comments = comments
  }

  get (): CommentWithReplies[] {
    return this.comments.map((comment) => {
      return {
        id: comment.id,
        username: comment.username,
        date: comment.date,
        content: this.modifyCommentContent(comment.isDeleted, comment.content),
        replies: this.replies.filter((reply) => reply.commentId === comment.id).map((reply) => ({
          id: reply.id,
          username: reply.username,
          date: reply.createdAt,
          content: this.modifyReplyContent(reply.isDeleted, reply.content)
        }))
      }
    })
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
