import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'
import ThreadRepository from '../../../threads/ThreadRepository'
import NewComment from '../../model/DomainModel/NewComment'

class NewCommentFactory {
    private threadRepository: ThreadRepository;
    constructor (threadRepository: ThreadRepository) {
      this.threadRepository = threadRepository
    }

    async create ({ content }:UnvalidatedPayload, userId: string, threadId: string): Promise<NewComment> {
      if (!content) {
        throw new Error('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
      }

      if (typeof content !== 'string') {
        throw new Error('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
      }
      if (!await this.threadRepository.isThreadHasCreated(threadId)) {
        throw new Error('NEW_COMMENT.THREAD_ID_IS_INVALID')
      }

      return {
        userId,
        threadId,
        content
      }
    }
}

export default NewCommentFactory
