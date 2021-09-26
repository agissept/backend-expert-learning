import AddedComment from '../AddedComment'
import NewComment from '../../NewComment/NewComment'

describe('a AddedComment factory', () => {
  it('should create addedComment object correctly', () => {
    const payload = {
      content: 'ini adalah komentar'
    }
    const userId = 'user-1'
    const threadId = 'thread-1'
    const newComment = new NewComment(payload, userId, threadId)
    const commentId = 'comment-123'

    const addedComment = new AddedComment(commentId, newComment)

    expect(addedComment.id).toEqual(commentId)
    expect(addedComment.content).toEqual(payload.content)
    expect(addedComment.owner).toEqual(userId)
  })
})
