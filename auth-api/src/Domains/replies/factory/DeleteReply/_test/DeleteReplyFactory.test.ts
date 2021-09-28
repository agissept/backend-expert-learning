import ThreadRepository from '../../../../threads/ThreadRepository'
import CommentRepository from '../../../../comment/CommentRepository'
import DeleteReplyFactory from '../DeleteReplyFactory'
import ReplyRepository from '../../../ReplyRepository'

describe('DeleteReplyFactory', () => {
  const userId = 'user-123'
  const threadId = 'thread-123'
  const commentId = 'comment-123'
  const replyId = 'reply-123'

  const threadRepository = <ThreadRepository>{}
  const commentRepository = <CommentRepository>{}
  const replyRepository = <ReplyRepository>{}

  it('should throw error when thread id is not created', async () => {
    threadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(false))
    commentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(false))
    replyRepository.getReplyById = jest.fn().mockImplementation(() => Promise.resolve(undefined))

    const deleteReplyFactory = new DeleteReplyFactory(threadRepository, commentRepository, replyRepository)

    await expect(() => deleteReplyFactory.create(userId, threadId, commentId, replyId)).rejects.toThrowError('DELETE_REPLY.THREAD_ID_IS_INVALID')
  })

  it('should throw error when comment id is not created', async () => {
    threadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    commentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(false))
    replyRepository.getReplyById = jest.fn().mockImplementation(() => Promise.resolve(undefined))

    const deleteReplyFactory = new DeleteReplyFactory(threadRepository, commentRepository, replyRepository)

    await expect(() => deleteReplyFactory.create(userId, threadId, commentId, replyId)).rejects.toThrowError('DELETE_REPLY.COMMENT_ID_IS_INVALID')
  })

  it('should throw error when reply id is not created', async () => {
    threadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    commentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    replyRepository.getReplyById = jest.fn().mockImplementation(() => Promise.resolve(undefined))

    const deleteReplyFactory = new DeleteReplyFactory(threadRepository, commentRepository, replyRepository)

    await expect(() => deleteReplyFactory.create(userId, threadId, commentId, replyId)).rejects.toThrowError('DELETE_REPLY.REPLY_ID_IS_INVALID')
  })

  it('should throw error when reply is deleted by non-author', async () => {
    threadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    commentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    replyRepository.getReplyById = jest.fn().mockImplementation(() => Promise.resolve({
      commentId: 'comment-123',
      content: 'sebuah balasan',
      createdAt: Date.now().toString(),
      id: 'reply-123',
      isDeleted: false,
      userId: 'user-1',
      username: 'asep'
    }))

    const deleteReplyFactory = new DeleteReplyFactory(threadRepository, commentRepository, replyRepository)

    await expect(() => deleteReplyFactory.create(userId, threadId, commentId, replyId)).rejects.toThrowError('DELETE_REPLY.CANNOT_WRITE_THIS_RESOURCE')
  })

  it('should return replyId correctly', async () => {
    threadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    commentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    replyRepository.getReplyById = jest.fn().mockImplementation(() => Promise.resolve({
      commentId: 'comment-123',
      content: 'sebuah balasan',
      createdAt: Date.now().toString(),
      id: 'reply-123',
      isDeleted: false,
      userId,
      username: 'asep'
    }))

    const deleteReplyFactory = new DeleteReplyFactory(threadRepository, commentRepository, replyRepository)
    expect(await deleteReplyFactory.create(userId, threadId, commentId, replyId)).toStrictEqual(replyId)
  })
})
