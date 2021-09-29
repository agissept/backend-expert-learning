import Reply from '../../../replies/model/Reply'

interface CommentWithReplies {
    id: string,
    username: string,
    date: string,
    content: string,
    likeCount: number,
    replies: Reply[]
}

export default CommentWithReplies
