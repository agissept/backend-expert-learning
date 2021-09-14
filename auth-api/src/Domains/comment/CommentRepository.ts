import AddedComment from './entities/AddedComment/AddedComment'
import NewComment from './entities/NewComment/NewComment'

interface CommentRepository{
    addComment(newComment: NewComment): Promise<AddedComment>
}
export default CommentRepository
