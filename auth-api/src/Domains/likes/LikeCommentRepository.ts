import LikeComment from './model/LikeComment'

interface LikeCommentRepository {
    likeComment(likeComment: LikeComment): Promise<void>;

}

export default LikeCommentRepository
