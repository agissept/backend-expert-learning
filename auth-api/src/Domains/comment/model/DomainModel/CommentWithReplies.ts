import Reply from '../../../replies/model/Reply'

interface CommentWithReplies {
    id: string,
    username: string,
    date: string,
    content: string,
    replies: Reply[]
}

export default CommentWithReplies
