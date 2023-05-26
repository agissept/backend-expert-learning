import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'
import DeleteCommentFactory from '../../../Domains/comment/factory/DeleteComment/DeleteCommentFactory'
import ThreadRepository from '../../../Domains/threads/ThreadRepository'
import CommentRepository from '../../../Domains/comment/CommentRepository'

class DeleteCommentUseCase {
    private readonly threadRepository: ThreadRepository
    private readonly commentRepository: CommentRepository;

    constructor ({ commentRepository, threadRepository }: UseCaseConstructor) {
      this.commentRepository = commentRepository
      this.threadRepository = threadRepository
    }

    async execute (userId: string, threadId: string, commentId: string) {
      const deleteCommentFactory = new DeleteCommentFactory(this.threadRepository, this.commentRepository)
      const id = await deleteCommentFactory.create(userId, threadId, commentId)
      await this.commentRepository.softDeleteComment(id)
    }
}
export default DeleteCommentUseCase
