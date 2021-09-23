import AddedComment from './entities/AddedComment/AddedComment'
import NewComment from './entities/NewComment/NewComment'
import DetailComment from './model/DetailComment'

interface CommentRepository{
    getDetailComment(commentId: string): Promise<DetailComment>
    addComment(newComment: NewComment): Promise<AddedComment>
    deleteComment(commentId: string): Promise<void>
    isCommentAvailableInThread(threadId: string, commentId: string): Promise<Boolean>
}
export default CommentRepository
