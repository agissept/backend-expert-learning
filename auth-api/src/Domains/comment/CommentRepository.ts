import CommentDTO from './model/RepositoryModel/CommentDTO'
import NewComment from './model/DomainModel/NewComment'

interface CommentRepository{
    getDetailComment(commentId: string): Promise<CommentDTO>
    addComment(newComment: NewComment): Promise<string>
    softDeleteComment(commentId: string): Promise<void>
    isCommentAvailableInThread(threadId: string, commentId: string): Promise<Boolean>
    getCommentsByThreadId(threadId: string): Promise<Array<CommentDTO>>;
}
export default CommentRepository
