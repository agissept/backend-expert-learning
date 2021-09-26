import ThreadRepository from '../../../../threads/ThreadRepository'
import NewCommentFactory from '../NewCommentFactory'
import NewComment from '../NewComment'

describe('AddedThreadFactory', () => {
  it('should throw error when add comment but thread is not created yet', () => {
    const payload = {
      content: 'ini adalah komentar'
    }
    const userId = 'user-1234'
    const threadId = 'uncreatedthread'

    const mockThreadRepository = <ThreadRepository>{}
    mockThreadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(false))
    const factory = new NewCommentFactory(mockThreadRepository)

    expect(() => factory.create(payload, userId, threadId)).rejects.toThrowError('NEW_COMMENT.THREAD_ID_IS_INVALID')
  })

  it('should create newComment object correctly', async () => {
    // Arrange
    const payload = {
      content: 'ini adalah komentar'
    }
    const dummyUserId = 'user-1'
    const dummyThreadId = 'thread-123'

    const newComment = new NewComment(payload, dummyUserId, dummyThreadId)
    const mockThreadRepository = <ThreadRepository>{}
    mockThreadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    const factory = new NewCommentFactory(mockThreadRepository)

    await expect(factory.create(payload, dummyUserId, dummyThreadId)).resolves.toStrictEqual(newComment)
  })
})
