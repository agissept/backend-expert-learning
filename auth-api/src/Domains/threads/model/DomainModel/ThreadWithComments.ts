import CommentWithReplies from '../../../comment/model/DomainModel/CommentWithReplies'

interface ThreadWithComments {
    id: string,
    title: string,
    body: string,
    date: string
    username: string,
    comments: Array<CommentWithReplies>
}

export default ThreadWithComments
