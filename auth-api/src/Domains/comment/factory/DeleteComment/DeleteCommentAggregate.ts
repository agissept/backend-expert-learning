import CommentDTO from '../../model/RepositoryModel/CommentDTO'

class DeleteCommentAggregate {
    private readonly isThreadHasCreated: boolean
    private readonly detailComment: CommentDTO
    private readonly userId: string

    constructor (isThreadHasCreated: boolean, detailComment: CommentDTO, userId: string) {
      this.isThreadHasCreated = isThreadHasCreated
      this.detailComment = detailComment
      this.userId = userId
    }

    delete (commentId: string): string {
      if (!this.isThreadHasCreated) {
        throw new Error('DELETE_COMMENT.THREAD_ID_IS_INVALID')
      }

      if (!this.detailComment) {
        throw new Error('DELETE_COMMENT.COMMENT_ID_IS_INVALID')
      }

      if (this.detailComment.userId !== this.userId) {
        throw new Error('DELETE_COMMENT.CANNOT_WRITE_THIS_RESOURCE')
      }

      return commentId
    }
}

export default DeleteCommentAggregate
