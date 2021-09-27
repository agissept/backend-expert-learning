import NewReplyFactory from '../NewReplyFactory'
import CommentRepository from '../../../../comment/CommentRepository'
import ThreadRepository from '../../../../threads/ThreadRepository'

describe('NewReplyFactory', () => {
  const mockCommentRepository = <CommentRepository>{}
  const mockThreadRepository = <ThreadRepository>{}
  const factory = new NewReplyFactory(mockCommentRepository, mockThreadRepository)

  it('should throw error when payload not contain needed property', () => {
    const payload = {}
    const userId = 'user-123'
    const threadId = 'thread-123'

    const commentId = 'comment-123'

    expect(() => factory.create(payload, userId, commentId, threadId)).rejects.toThrowError('NEW_REPLY.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      content: 123
    }
    const userId = 'user-1'
    const threadId = 'thread-123'

    const commentId = 'comment-123'

    expect(() => factory.create(payload, userId, commentId, threadId)).rejects.toThrowError('NEW_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should throw error when add reply but comment is not created yet', () => {
    const payload = {
      content: 'ini adalah balasan'
    }
    const userId = 'user-1234'
    const commentId = 'uncreatedcomment'
    const threadId = 'thread-123'

    mockThreadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    mockCommentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(false))

    expect(() => factory.create(payload, userId, commentId, threadId)).rejects.toThrowError('NEW_REPLY.COMMENT_ID_IS_INVALID')
  })

  it('should throw error when add reply but thread is not created yet', () => {
    const payload = {
      content: 'ini adalah balasan'
    }
    const userId = 'user-1234'
    const commentId = 'comment-123'
    const threadId = 'uncreatedthread'

    mockThreadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(false))
    mockCommentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(false))

    expect(() => factory.create(payload, userId, commentId, threadId)).rejects.toThrowError('NEW_REPLY.THREAD_ID_IS_INVALID')
  })

  it('should create newReply object correctly', async () => {
    // Arrange
    const payload = {
      content: 'ini adalah balasan'
    }
    const dummyUserId = 'user-1'
    const dummyCommentId = 'comment-123'
    const dummyThreadId = 'thread-123'

    const newComment = {
      content: 'ini adalah balasan',
      commentId: 'comment-123',
      userId: 'user-1'
    }
    mockCommentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    mockThreadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))

    await expect(factory.create(payload, dummyUserId, dummyCommentId, dummyThreadId)).resolves.toStrictEqual(newComment)
  })
})
