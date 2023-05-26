import NewReply from '../../../../Domains/replies/model/NewReply'
import ReplyRepository from '../../../../Domains/replies/ReplyRepository'
import CommentRepository from '../../../../Domains/comment/CommentRepository'
import AddReplyUseCase from '../AddReplyUseCase'
import ThreadRepository from '../../../../Domains/threads/ThreadRepository'

describe('AddReplyUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const payload = {
      content: 'ini adalah balasan'
    }
    const userId = 'user-123'
    const threadId = 'thread-123'
    const commentId = 'comment-123'
    const replyId = 'reply-123'
    const newReply: NewReply = { content: payload.content, commentId, userId }

    const expectedReply = { id: replyId, owner: newReply.userId, content: newReply.content }
    const threadRepository = <ThreadRepository>{}
    const commentRepository = <CommentRepository>{}
    const replyRepository = <ReplyRepository>{}

    commentRepository.isCommentHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    threadRepository.isThreadHasCreated = jest.fn().mockImplementation(() => Promise.resolve(true))
    replyRepository.addReply = jest.fn().mockImplementation(() => Promise.resolve(replyId))

    const addReplyUseCase = new AddReplyUseCase({ commentRepository, replyRepository, threadRepository })

    const addedReply = await addReplyUseCase.execute(payload, userId, commentId, threadId)
    expect(addedReply).toStrictEqual(expectedReply)
    expect(replyRepository.addReply).toBeCalledWith(newReply)
  })
})
