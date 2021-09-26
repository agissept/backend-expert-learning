import AddedComment from './entities/AddedComment/AddedComment'
import NewComment from './entities/NewComment/NewComment'
import CommentDTO from './model/RepositoryModel/CommentDTO'

interface CommentRepository{
    getDetailComment(commentId: string): Promise<CommentDTO>
    addComment(newComment: NewComment): Promise<AddedComment>
    softDeleteComment(commentId: string): Promise<void>
    isCommentAvailableInThread(threadId: string, commentId: string): Promise<Boolean>
    getCommentsByThreadId(threadId: string): Promise<Array<CommentDTO>>;
}
export default CommentRepository
