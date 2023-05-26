import ReplyDTO from '../../model/ReplyDTO'

class DeleteReplyAggregate {
    private readonly isThreadHasCreated: boolean;
    private readonly isCommentHasCreated: boolean;
    private readonly reply?: ReplyDTO;
    private readonly userId: string;

    constructor (isThreadHasCreated: boolean, isCommentHasCreated: boolean, reply: ReplyDTO|undefined, userId: string) {
      this.isThreadHasCreated = isThreadHasCreated
      this.isCommentHasCreated = isCommentHasCreated
      this.reply = reply
      this.userId = userId
    }

    delete (replyId: string) {
      if (!this.isThreadHasCreated) {
        throw Error('DELETE_REPLY.THREAD_ID_IS_INVALID')
      }

      if (!this.isCommentHasCreated) {
        throw Error('DELETE_REPLY.COMMENT_ID_IS_INVALID')
      }

      if (!this.reply) {
        throw Error('DELETE_REPLY.REPLY_ID_IS_INVALID')
      }

      if (this.reply.userId !== this.userId) {
        throw new Error('DELETE_REPLY.CANNOT_WRITE_THIS_RESOURCE')
      }

      return replyId
    }
}

export default DeleteReplyAggregate
