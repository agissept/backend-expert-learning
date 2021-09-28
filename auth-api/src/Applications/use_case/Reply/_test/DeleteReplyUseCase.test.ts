import CommentRepository from '../../../../Domains/comment/CommentRepository'
import ThreadRepository from '../../../../Domains/threads/ThreadRepository'
import ReplyRepository from '../../../../Domains/replies/ReplyRepository'
import DeleteReplyUseCase from '../DeleteReplyUseCase'

describe('DeleteReplyUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const threadId = 'thread-123'
    const commentId = 'comment-123'
    const userId = 'user-123'
    const replyId = 'reply-123'

    const commentRepository = <CommentRepository>{}
    const threadRepository = <ThreadRepository>{}
    const replyRepository = <ReplyRepository>{}
    commentRepository.softDeleteComment = jest.fn().mockImplementation()
    threadRepository.isThreadHasCreated = jest.fn(() => Promise.resolve(true))
    commentRepository.isCommentHasCreated = jest.fn(() => Promise.resolve(true))
    replyRepository.getReplyById = jest.fn(() => Promise.resolve({
      commentId: 'comment-123',
      content: 'sebuah balasan',
      createdAt: Date.now().toString(),
      id: 'reply-123',
      isDeleted: false,
      userId,
      username: 'asep'
    }))
    replyRepository.softDeleteReply = jest.fn(() => Promise.resolve())

    const deleteReplyUseCase = new DeleteReplyUseCase({ commentRepository, threadRepository, replyRepository })

    await deleteReplyUseCase.execute(userId, threadId, commentId, replyId)

    expect(replyRepository.softDeleteReply).toBeCalledWith(replyId)
  })
})
