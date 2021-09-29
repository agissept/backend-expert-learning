import CommentRepository from '../../../comment/CommentRepository'
import ThreadRepository from '../../../threads/ThreadRepository'
import LikeCommentRepository from '../../LikeCommentRepository'
import LikeCommentFactory from '../LikeCommentFactory'

describe('LikeCommentFactory', () => {
  const mockCommentRepository = <CommentRepository>{}
  const mockThreadRepository = <ThreadRepository>{}
  const mockLikeCommentRepository = <LikeCommentRepository>{}
  const factory = new LikeCommentFactory(mockCommentRepository, mockThreadRepository, mockLikeCommentRepository)

  it('should throw error when like comment but comment is not created yet', () => {
    const userId = 'user-1234'
    const commentId = 'uncreatedcomment'
    const threadId = 'thread-123'

    mockThreadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    mockCommentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(false))

    expect(() => factory.create(userId, commentId, threadId)).rejects.toThrowError('LIKE_COMMENT.COMMENT_ID_IS_INVALID')
  })

  it('should throw error when add like comment but thread is not created yet', () => {
    const userId = 'user-1234'
    const commentId = 'comment-123'
    const threadId = 'uncreatedthread'

    mockThreadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(false))
    mockCommentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(false))

    expect(() => factory.create(userId, commentId, threadId)).rejects.toThrowError('LIKE_COMMENT.THREAD_ID_IS_INVALID')
  })

  it('should return LikeComment properly if user not yet liked the comment', async () => {
    const dummyUserId = 'user-1'
    const dummyCommentId = 'comment-123'
    const dummyThreadId = 'thread-123'

    mockCommentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    mockThreadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    mockLikeCommentRepository.isUserHasLikedTheComment = jest.fn(() => Promise.resolve(false))

    const likeComment = {
      userId: dummyUserId,
      commentId: dummyCommentId,
      isLiked: false
    }

    await expect(factory.create(dummyUserId, dummyCommentId, dummyThreadId)).resolves.toStrictEqual(likeComment)
  })

  it('should return LikeComment properly if user has been liked the comment', async () => {
    const dummyUserId = 'user-1'
    const dummyCommentId = 'comment-123'
    const dummyThreadId = 'thread-123'

    mockCommentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    mockThreadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    mockLikeCommentRepository.isUserHasLikedTheComment = jest.fn(() => Promise.resolve(true))

    const likeComment = {
      userId: dummyUserId,
      commentId: dummyCommentId,
      isLiked: true
    }

    await expect(factory.create(dummyUserId, dummyCommentId, dummyThreadId)).resolves.toStrictEqual(likeComment)
  })
})
