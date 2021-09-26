import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'
import CommentRepository from '../../../Domains/comment/CommentRepository'
import ThreadRepository from '../../../Domains/threads/ThreadRepository'
import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import NewCommentFactory from '../../../Domains/comment/factory/NewComment/NewCommentFactory'
import AddedComment from '../../../Domains/comment/model/DomainModel/AddedComment'

class AddCommentUseCase {
     commentRepository: CommentRepository
     threadRepository: ThreadRepository

     constructor ({ commentRepository, threadRepository }: UseCaseConstructor) {
       this.commentRepository = commentRepository
       this.threadRepository = threadRepository
     }

     async execute (payload: UnvalidatedPayload, userId: string, threadId: string): Promise<AddedComment> {
       const factory = new NewCommentFactory(this.threadRepository)
       const newComment = await factory.create(payload, userId, threadId)
       const commentId = await this.commentRepository.addComment(newComment)
       return {
         id: commentId,
         content: newComment.content,
         owner: newComment.userId
       }
     }
}

export default AddCommentUseCase
