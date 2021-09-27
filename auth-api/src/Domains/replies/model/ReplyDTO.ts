interface ReplyDTO {
    id: string,
    userId: string,
    commentId: string,
    content: string,
    isDeleted: boolean,
    createdAt: string
    username: string
}

export default ReplyDTO
