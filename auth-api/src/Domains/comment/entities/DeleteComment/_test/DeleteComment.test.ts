import DeleteCommentAggregate from '../DeleteCommentAggregate'
import DetailComment from '../../../model/DetailComment'

describe('DeleteComment', () => {
  it('should throw error when thread is not created', async () => {
    const isThreadHasCreated = false
    const userId = 'user-123'
    const commentId = 'comment-123'

    const detailComment = {
      id: 'comment-123',
      userId: 'user-123'
    }

    const deleteComment = new DeleteCommentAggregate(isThreadHasCreated, detailComment, userId)

    expect(() => deleteComment.delete(commentId)).toThrowError('DELETE_COMMENT.THREAD_ID_IS_INVALID')
  })

  it('should throw error when comment id is not created', async () => {
    const isThreadHasCreated = true
    const userId = 'user-123'
    const commentId = 'comment-123'

    const detailComment = undefined as unknown as DetailComment

    const deleteComment = new DeleteCommentAggregate(isThreadHasCreated, detailComment, userId)

    expect(() => deleteComment.delete(commentId)).toThrowError('DELETE_COMMENT.COMMENT_ID_IS_INVALID')
  })

  it('should throw error when comment is deleted by non-author', async () => {
    const isThreadHasCreated = true
    const userId = 'user-1234'
    const detailComment = {
      id: 'comment-123',
      userId: 'user-123'
    }
    const commentId = 'comment-123'

    const deleteComment = new DeleteCommentAggregate(isThreadHasCreated, detailComment, userId)
    await expect(() => deleteComment.delete(commentId)).toThrowError('DELETE_COMMENT.CANNOT_WRITE_THIS_RESOURCE')
  })

  it('should return commentId correctly', async () => {
    const isThreadHasCreated = true
    const userId = 'user-123'
    const detailComment = {
      id: 'comment-123',
      userId: 'user-123'
    }
    const commentId = 'comment-123'

    const deleteComment = new DeleteCommentAggregate(isThreadHasCreated, detailComment, userId)
    expect(deleteComment.delete(commentId)).toEqual(commentId)
  })
})
