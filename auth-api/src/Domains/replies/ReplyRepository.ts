import NewReply from './model/NewReply'
import ReplyDTO from './model/ReplyDTO'

interface ReplyRepository {
    addReply(newReply: NewReply): Promise<string>
    getRepliesByCommentIds(commentIds: string[]): Promise<ReplyDTO[]>
    getReplyById(replyId: string): Promise<ReplyDTO|undefined>;
    softDeleteReply(replyId: string): Promise<void>
}

export default ReplyRepository
