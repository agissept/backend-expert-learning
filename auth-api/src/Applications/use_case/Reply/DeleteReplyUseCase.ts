import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'
import CommentRepository from '../../../Domains/comment/CommentRepository'
import ThreadRepository from '../../../Domains/threads/ThreadRepository'
import ReplyRepository from '../../../Domains/replies/ReplyRepository'

import DeleteReplyFactory from '../../../Domains/replies/factory/DeleteReply/DeleteReplyFactory'

class DeleteReplyUseCase {
    private readonly commentRepository: CommentRepository;
    private readonly threadRepository: ThreadRepository;
    private readonly replyRepository: ReplyRepository;
    constructor ({ commentRepository, threadRepository, replyRepository }: UseCaseConstructor) {
      this.commentRepository = commentRepository
      this.threadRepository = threadRepository
      this.replyRepository = replyRepository
    }

    async execute (userId: string, threadId: string, commentId: string, replyId:string) {
      const deleteCommentFactory = new DeleteReplyFactory(this.threadRepository, this.commentRepository, this.replyRepository)
      const id = await deleteCommentFactory.create(userId, threadId, commentId, replyId)
      await this.replyRepository.softDeleteReply(id)
    }
}

export default DeleteReplyUseCase
