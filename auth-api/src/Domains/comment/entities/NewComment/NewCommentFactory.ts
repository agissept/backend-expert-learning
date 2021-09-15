import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'
import ThreadRepository from '../../../threads/ThreadRepository'
import NewComment from './NewComment'

class NewCommentFactory {
    private threadRepository: ThreadRepository;
    constructor (threadRepository: ThreadRepository) {
      this.threadRepository = threadRepository
    }

    async create (payload:UnvalidatedPayload, userId: string, threadId: string) {
      const newComment = new NewComment(payload, userId, threadId)
      if (!await this.threadRepository.isThreadHasCreated(threadId)) {
        throw new Error('NEW_COMMENT.THREAD_ID_IS_INVALID')
      }

      return newComment
    }
}

export default NewCommentFactory
