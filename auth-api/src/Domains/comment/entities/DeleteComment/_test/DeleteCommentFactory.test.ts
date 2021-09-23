import DeleteCommentFactory from '../DeleteCommentFactory'
import ThreadRepository from '../../../../threads/ThreadRepository'
import CommentRepository from '../../../CommentRepository'
import DetailComment from '../../../model/DetailComment'

describe('DeleteCommentFactory', () => {
  it('should throw error when thread id is not created', async () => {
    const userId = 'user-123'
    const threadId = 'thread-123'
    const commentId = 'comment-123'

    const threadRepository = <ThreadRepository>{}
    const commentRepository = <CommentRepository>{}

    threadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(false))
    commentRepository.getDetailComment = jest.fn(() => Promise.resolve({} as DetailComment))

    const deleteCommentFactory = new DeleteCommentFactory(threadRepository, commentRepository)

    await expect(() => deleteCommentFactory.create(userId, threadId, commentId)).rejects.toThrowError('DELETE_COMMENT.THREAD_ID_IS_INVALID')
  })

  it('should throw error when comment id is not created', async () => {
    const userId = 'user-123'
    const threadId = 'thread-123'
    const commentId = 'comment-123'

    const threadRepository = <ThreadRepository>{}
    const commentRepository = <CommentRepository>{}

    threadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    commentRepository.getDetailComment = jest.fn().mockImplementation(() => Promise.resolve())

    const deleteCommentFactory = new DeleteCommentFactory(threadRepository, commentRepository)

    await expect(() => deleteCommentFactory.create(userId, threadId, commentId)).rejects.toThrowError('DELETE_COMMENT.COMMENT_ID_IS_INVALID')
  })

  it('should throw error when comment is deleted by non-author', async () => {
    const userId = 'user-123'
    const threadId = 'thread-123'
    const commentId = 'comment-123'

    const threadRepository = <ThreadRepository>{}
    const commentRepository = <CommentRepository>{}

    threadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    commentRepository.getDetailComment = jest.fn().mockImplementation(() => Promise.resolve({
      user_id: 'user-1',
      thread_id: 'thread-123',
      comment_id: 'comment-123'
    }))

    const deleteCommentFactory = new DeleteCommentFactory(threadRepository, commentRepository)

    await expect(() => deleteCommentFactory.create(userId, threadId, commentId)).rejects.toThrowError('DELETE_COMMENT.CANNOT_WRITE_THIS_RESOURCE')
  })

  it('should return commentId correctly', async () => {
    const userId = 'user-123'
    const threadId = 'thread-123'
    const commentId = 'comment-123'

    const threadRepository = <ThreadRepository>{}
    const commentRepository = <CommentRepository>{}

    threadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    commentRepository.getDetailComment = jest.fn().mockImplementation(() => Promise.resolve({
      userId: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-123'
    }))

    const deleteCommentFactory = new DeleteCommentFactory(threadRepository, commentRepository)
    expect(await deleteCommentFactory.create(userId, threadId, commentId)).toStrictEqual(commentId)
  })
})
