import LikeComment from './model/LikeComment'

interface LikeCommentRepository {
    likeComment(likeComment: LikeComment): Promise<void>;
    unlikeComment(likeComment: LikeComment): Promise<void>;
    isUserHasLikedTheComment(likeComment: LikeComment): Promise<boolean>
}

export default LikeCommentRepository
