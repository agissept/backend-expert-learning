import ThreadRepository from '../../ThreadRepository'
import GetDetailThreadAggregate from './GetDetailThreadAggregate'

class GetDetailThreadFactory {
    private threadRepository: ThreadRepository;

    constructor (threadRepository: ThreadRepository) {
      this.threadRepository = threadRepository
    }

    async create (threadId: string) {
      const thread = await this.threadRepository.getDetailThread(threadId)
      if (!thread) {
        throw Error('GET_DETAIL_THREAD.THREAD_IS_NOT_FOUND')
      }
      const getThreadAggregate = new GetDetailThreadAggregate(thread)
      return getThreadAggregate.get()
    }
}

export default GetDetailThreadFactory
