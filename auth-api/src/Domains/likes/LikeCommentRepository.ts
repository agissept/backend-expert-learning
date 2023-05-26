import LikeComment from './model/LikeComment'
import LikedCommentsCountDTO from './model/LikedCommentsCount'

interface LikeCommentRepository {
    likeComment(likeComment: LikeComment): Promise<void>;
    unlikeComment(likeComment: LikeComment): Promise<void>;
    isUserHasLikedTheComment(likeComment: LikeComment): Promise<boolean>
    getLikeCountCommentsByCommentIds(commentIds: string[]): Promise<LikedCommentsCountDTO[]>
}

export default LikeCommentRepository
