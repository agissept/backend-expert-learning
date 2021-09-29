import CommentRepository from '../../../../Domains/comment/CommentRepository'
import ThreadRepository from '../../../../Domains/threads/ThreadRepository'
import LikeCommentUseCase from '../LikeCommentUseCase'
import LikeCommentRepository from '../../../../Domains/likes/LikeCommentRepository'
import LikeComment from '../../../../Domains/likes/model/LikeComment'

describe('LikeCommentUseCase', () => {
  it('should orchestrating the like comment action correctly', async () => {
    const threadId = 'thread-123'
    const commentId = 'comment-123'
    const userId = 'user-123'

    const commentRepository = <CommentRepository>{}
    const threadRepository = <ThreadRepository>{}
    const likeCommentRepository = <LikeCommentRepository>{}
    threadRepository.isThreadHasCreated = jest.fn(() => Promise.resolve(true))
    commentRepository.isCommentHasCreated = jest.fn(() => Promise.resolve(true))
    likeCommentRepository.likeComment = jest.fn()

    const likeComment: LikeComment = {
      commentId,
      userId
    }

    const likeCommentUseCase = new LikeCommentUseCase({ commentRepository, threadRepository, likeCommentRepository })

    await likeCommentUseCase.execute(userId, threadId, commentId)

    expect(likeCommentRepository.likeComment).toBeCalledWith(likeComment)
  })
})
