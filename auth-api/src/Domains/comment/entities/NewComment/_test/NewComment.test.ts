import NewComment from '../NewComment'

describe('NewComment entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {}
    const userId = 'user-123'

    const threadId = 'thread-123'

    // Action & Assert
    expect(() => new NewComment(payload, userId, threadId)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 123
    }
    const userId = 'user-1'

    const threadId = 'thread-123'

    // Action & Assert
    expect(() => new NewComment(payload, userId, threadId)).toThrowError('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create newComment object correctly', () => {
    // Arrange
    const payload = {
      content: 'ini adalah komentar'
    }
    const dummyUserId = 'user-1'
    const dummyThreadId = 'thread-123'
    // Action
    const { content, userId, threadId } = new NewComment(payload, dummyUserId, dummyThreadId)

    // Assert
    expect(content).toEqual(payload.content)
    expect(userId).toEqual(dummyUserId)
    expect(threadId).toEqual(dummyThreadId)
  })
})
