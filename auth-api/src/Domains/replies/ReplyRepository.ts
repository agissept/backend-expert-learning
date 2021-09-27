import NewReply from './model/NewReply'
import ReplyDTO from './model/ReplyDTO'

interface ReplyRepository {
    addReply(newReply: NewReply): Promise<string>
    getRepliesByCommentIds(commentIds: string[]): Promise<ReplyDTO[]>
}

export default ReplyRepository
