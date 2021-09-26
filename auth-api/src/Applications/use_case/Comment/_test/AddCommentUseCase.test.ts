import AddCommentUseCase from '../AddCommentUseCase'
import ThreadRepository from '../../../../Domains/threads/ThreadRepository'
import CommentRepository from '../../../../Domains/comment/CommentRepository'
import AddedComment from '../../../../Domains/comment/factory/AddedComment/AddedComment'
import NewComment from '../../../../Domains/comment/factory/NewComment/NewComment'

describe('AddCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const payload = {
      content: 'ini adalah komentar'
    }
    const userId = 'user-123'
    const threadId = 'thread-123'
    const commentId = 'comment-123'

    const expectedComment = new AddedComment(commentId, new NewComment(payload, userId, threadId))

    const threadRepository = <ThreadRepository>{}
    const commentRepository = <CommentRepository>{}
    threadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    commentRepository.addComment = jest.fn().mockImplementation(() => Promise.resolve(expectedComment))

    const addCommentUseCase = new AddCommentUseCase({ threadRepository, commentRepository })

    const addedComment = await addCommentUseCase.execute(payload, userId, threadId)
    expect(addedComment).toStrictEqual(expectedComment)
    expect(commentRepository.addComment).toBeCalledWith(new NewComment(payload, userId, threadId)
    )
  })
})
