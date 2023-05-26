import ThreadRepository from '../../../../threads/ThreadRepository'
import NewCommentFactory from '../NewCommentFactory'

describe('AddedThreadFactory', () => {
  const mockThreadRepository = <ThreadRepository>{}
  const factory = new NewCommentFactory(mockThreadRepository)

  it('should throw error when payload not contain needed property', () => {
    const payload = {}
    const userId = 'user-123'

    const threadId = 'thread-123'

    expect(() => factory.create(payload, userId, threadId)).rejects.toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      content: 123
    }
    const userId = 'user-1'

    const threadId = 'thread-123'

    expect(() => factory.create(payload, userId, threadId)).rejects.toThrowError('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should throw error when add comment but thread is not created yet', () => {
    const payload = {
      content: 'ini adalah komentar'
    }
    const userId = 'user-1234'
    const threadId = 'uncreatedthread'

    mockThreadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(false))

    expect(() => factory.create(payload, userId, threadId)).rejects.toThrowError('NEW_COMMENT.THREAD_ID_IS_INVALID')
  })

  it('should create newComment object correctly', async () => {
    // Arrange
    const payload = {
      content: 'ini adalah komentar'
    }
    const dummyUserId = 'user-1'
    const dummyThreadId = 'thread-123'

    const newComment = {
      content: 'ini adalah komentar',
      threadId: 'thread-123',
      userId: 'user-1'
    }
    mockThreadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))

    await expect(factory.create(payload, dummyUserId, dummyThreadId)).resolves.toStrictEqual(newComment)
  })
})
