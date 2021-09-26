import ThreadRepository from '../../ThreadRepository'
import GetDetailThreadAggregate from './GetDetailThreadAggregate'
import CommentRepository from '../../../comment/CommentRepository'

class GetDetailThreadFactory {
    private threadRepository: ThreadRepository;
    private commentRepository: CommentRepository;

    constructor (threadRepository: ThreadRepository, commentRepository: CommentRepository) {
      this.threadRepository = threadRepository
      this.commentRepository = commentRepository
    }

    async create (threadId: string) {
      const thread = await this.threadRepository.getDetailThread(threadId)
      if (!thread) {
        throw Error('GET_DETAIL_THREAD.THREAD_IS_NOT_FOUND')
      }
      const comments = await this.commentRepository.getCommentsByThreadId(threadId)
      const getThreadAggregate = new GetDetailThreadAggregate(thread, comments)
      return getThreadAggregate.get()
    }
}

export default GetDetailThreadFactory
