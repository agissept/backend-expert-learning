import DeleteCommentUseCase from '../DeleteCommentUseCase'
import CommentRepository from '../../../../Domains/comment/CommentRepository'
import ThreadRepository from '../../../../Domains/threads/ThreadRepository'
import CommentDTO from '../../../../Domains/comment/model/RepositoryModel/CommentDTO'

describe('DeleteCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const threadId = 'thread-123'
    const commentId = 'comment-123'
    const userId = 'user-123'

    const commentRepository = <CommentRepository>{}
    const threadRepository = <ThreadRepository>{}
    commentRepository.deleteComment = jest.fn().mockImplementation()
    threadRepository.isThreadHasCreated = jest.fn(() => Promise.resolve(true))
    commentRepository.getDetailComment = jest.fn(() => Promise.resolve({
      id: 'comment-1',
      userId: 'user-123'
    } as unknown as CommentDTO))

    const deleteThreadUseCase = new DeleteCommentUseCase({ commentRepository, threadRepository })

    await deleteThreadUseCase.execute(userId, threadId, commentId)
  })
})
