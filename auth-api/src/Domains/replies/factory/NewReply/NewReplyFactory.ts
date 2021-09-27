import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'
import NewReply from '../../model/NewReply'
import CommentRepository from '../../../comment/CommentRepository'

class NewReplyFactory {
    private commentRepository: CommentRepository;

    constructor (commentRepository: CommentRepository) {
      this.commentRepository = commentRepository
    }

    async create ({ content }: UnvalidatedPayload, userId: string, commentId: string): Promise<NewReply> {
      if (!content) {
        throw new Error('NEW_REPLY.NOT_CONTAIN_NEEDED_PROPERTY')
      }

      if (typeof content !== 'string') {
        throw new Error('NEW_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION')
      }
      if (!await this.commentRepository.isCommentHasCreated(commentId)) {
        throw new Error('NEW_REPLY.COMMENT_ID_IS_INVALID')
      }

      return {
        userId,
        commentId,
        content
      }
    }
}

export default NewReplyFactory
