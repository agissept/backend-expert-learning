import NewComment from '../NewComment/NewComment'

class AddedComment {
    id: string
    content: string
    owner: string

    constructor (id: string, { content, userId }: NewComment) {
      this.id = id
      this.content = content
      this.owner = userId
    }
}

export default AddedComment
