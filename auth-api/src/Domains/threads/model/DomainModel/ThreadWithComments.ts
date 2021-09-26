import Comment from '../../../comment/model/DomainModel/Comment'

interface ThreadWithComments {
    id: string,
    title: string,
    body: string,
    date: string
    username: string,
    comments: Array<Comment>
}

export default ThreadWithComments
