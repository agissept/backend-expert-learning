import DeleteReplyAggregate from '../DeleteReplyAggregate'
import ReplyDTO from '../../../model/ReplyDTO'

describe('DeleteReply', () => {
  it('should throw error when thread is not created', async () => {
    const isThreadHasCreated = false
    const isCommentHasCreated = false
    const userId = 'user-123'
    const replyId = 'reply-123'

    const reply = <ReplyDTO>{}

    const deleteReplyAggregate = new DeleteReplyAggregate(isThreadHasCreated, isCommentHasCreated, reply, userId)

    expect(() => deleteReplyAggregate.delete(replyId)).toThrowError('DELETE_REPLY.THREAD_ID_IS_INVALID')
  })

  it('should throw error when comment id is not created', async () => {
    const isThreadHasCreated = true
    const isCommentHasCreated = false
    const userId = 'user-123'
    const replyId = 'reply-123'

    const reply = <ReplyDTO>{}

    const deleteReply = new DeleteReplyAggregate(isThreadHasCreated, isCommentHasCreated, reply, userId)

    expect(() => deleteReply.delete(replyId)).toThrowError('DELETE_REPLY.COMMENT_ID_IS_INVALID')
  })

  it('should throw error when reply id is not created', async () => {
    const isThreadHasCreated = true
    const isCommentHasCreated = true
    const userId = 'user-123'
    const replyId = 'reply-123'

    const reply = undefined

    const deleteReply = new DeleteReplyAggregate(isThreadHasCreated, isCommentHasCreated, reply, userId)

    expect(() => deleteReply.delete(replyId)).toThrowError('DELETE_REPLY.REPLY_ID_IS_INVALID')
  })

  it('should throw error when reply is deleted by non-author', async () => {
    const isThreadHasCreated = true
    const isCommentHasCreated = true
    const userId = 'user-1234'

    const reply: ReplyDTO = {
      commentId: 'comment-123',
      content: 'sebuah balasan',
      createdAt: Date.now().toString(),
      id: 'reply-123',
      isDeleted: false,
      userId: 'user-1',
      username: 'asep'
    }
    const replyId = 'reply-123'

    const deleteReply = new DeleteReplyAggregate(isThreadHasCreated, isCommentHasCreated, reply, userId)
    expect(() => deleteReply.delete(replyId)).toThrowError('DELETE_REPLY.CANNOT_WRITE_THIS_RESOURCE')
  })
  it('should return replyId correctly', async () => {
    const isThreadHasCreated = true
    const isCommentHasCreated = true
    const userId = 'user-1234'

    const reply: ReplyDTO = {
      commentId: 'comment-123',
      content: 'sebuah balasan',
      createdAt: Date.now().toString(),
      id: 'reply-123',
      isDeleted: false,
      userId,
      username: 'asep'
    }
    const replyId = 'reply-123'

    const deleteReply = new DeleteReplyAggregate(isThreadHasCreated, isCommentHasCreated, reply, userId)
    expect(deleteReply.delete(replyId)).toEqual(replyId)
  })
})
