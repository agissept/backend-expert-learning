import NewReply from './model/NewReply'

interface ReplyRepository {
    addReply(newReply: NewReply): Promise<string>

}

export default ReplyRepository
