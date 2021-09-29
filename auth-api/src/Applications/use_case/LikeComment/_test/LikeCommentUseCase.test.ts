import CommentRepository from '../../../../Domains/comment/CommentRepository'
import ThreadRepository from '../../../../Domains/threads/ThreadRepository'
import LikeCommentUseCase from '../LikeCommentUseCase'
import LikeCommentRepository from '../../../../Domains/likes/LikeCommentRepository'
import LikeComment from '../../../../Domains/likes/model/LikeComment'

describe('LikeCommentUseCase', () => {
  it('should orchestrating the like comment action correctly when user not yet liked the comment', async () => {
    const threadId = 'thread-123'
    const commentId = 'comment-123'
    const userId = 'user-123'

    const commentRepository = <CommentRepository>{}
    const threadRepository = <ThreadRepository>{}
    const likeCommentRepository = <LikeCommentRepository>{}
    threadRepository.isThreadHasCreated = jest.fn(() => Promise.resolve(true))
    commentRepository.isCommentHasCreated = jest.fn(() => Promise.resolve(true))
    likeCommentRepository.isUserHasLikedTheComment = jest.fn(() => Promise.resolve(false))
    likeCommentRepository.likeComment = jest.fn()
    likeCommentRepository.unlikeComment = jest.fn()

    const likeComment: LikeComment = {
      commentId,
      userId,
      isLiked: false
    }

    const likeCommentUseCase = new LikeCommentUseCase({ commentRepository, threadRepository, likeCommentRepository })

    await likeCommentUseCase.execute(userId, threadId, commentId)

    expect(likeCommentRepository.unlikeComment).toBeCalledTimes(0)
    expect(likeCommentRepository.likeComment).toBeCalledWith(likeComment)
  })

  it('should orchestrating the like comment action correctly when user has been like the comment', async () => {
    const threadId = 'thread-123'
    const commentId = 'comment-123'
    const userId = 'user-123'

    const commentRepository = <CommentRepository>{}
    const threadRepository = <ThreadRepository>{}
    const likeCommentRepository = <LikeCommentRepository>{}
    threadRepository.isThreadHasCreated = jest.fn(() => Promise.resolve(true))
    commentRepository.isCommentHasCreated = jest.fn(() => Promise.resolve(true))
    likeCommentRepository.isUserHasLikedTheComment = jest.fn(() => Promise.resolve(true))
    likeCommentRepository.likeComment = jest.fn()
    likeCommentRepository.unlikeComment = jest.fn()

    const likeComment: LikeComment = {
      commentId,
      userId,
      isLiked: true
    }

    const likeCommentUseCase = new LikeCommentUseCase({ commentRepository, threadRepository, likeCommentRepository })

    await likeCommentUseCase.execute(userId, threadId, commentId)

    expect(likeCommentRepository.unlikeComment).toBeCalledWith(likeComment)
    expect(likeCommentRepository.likeComment).toBeCalledTimes(0)
  })
})
