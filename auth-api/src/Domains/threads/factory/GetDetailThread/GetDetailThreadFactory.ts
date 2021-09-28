import ThreadRepository from '../../ThreadRepository'
import CommentRepository from '../../../comment/CommentRepository'
import GetCommentsWithRepliesFactory
  from '../../../comment/factory/GetCommentsWithReplies/GetCommentsWithRepliesFactory'
import ReplyRepository from '../../../replies/ReplyRepository'
import ThreadWithComments from '../../model/DomainModel/ThreadWithComments'

class GetDetailThreadFactory {
    private threadRepository: ThreadRepository;
    private readonly commentRepository: CommentRepository;
    private readonly replyRepository: ReplyRepository;

    constructor (threadRepository: ThreadRepository, commentRepository: CommentRepository, replyRepository: ReplyRepository) {
      this.replyRepository = replyRepository
      this.threadRepository = threadRepository
      this.commentRepository = commentRepository
    }

    async create (threadId: string): Promise<ThreadWithComments> {
      const thread = await this.threadRepository.getDetailThread(threadId)
      if (!thread) {
        throw Error('GET_DETAIL_THREAD.THREAD_IS_NOT_FOUND')
      }
      const getCommentsWithRepliesFactory = new GetCommentsWithRepliesFactory(this.commentRepository, this.replyRepository)
      const commentsWithReplies = await getCommentsWithRepliesFactory.create(threadId)
      return {
        id: thread.id,
        title: thread.title,
        body: thread.body,
        date: thread.date,
        username: thread.username,
        comments: commentsWithReplies
      }
    }
}

export default GetDetailThreadFactory
