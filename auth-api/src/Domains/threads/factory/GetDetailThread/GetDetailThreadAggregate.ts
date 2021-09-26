import ThreadDTO from '../../model/RepositoryModel/ThreadDTO'
import CommentDTO from '../../../comment/model/RepositoryModel/CommentDTO'
import ThreadWithComments from '../../model/DomainModel/ThreadWithComments'
import Comment from '../../../comment/model/DomainModel/Comment'

class GetDetailThreadAggregate {
    private readonly thread: ThreadDTO;
    private comments: Array<CommentDTO>;

    constructor (thread: ThreadDTO, comments: Array<CommentDTO>) {
      this.thread = thread
      this.comments = comments
    }

    get () : ThreadWithComments {
      const comments: Comment[] = this.comments.map(comment => {
        if (comment.isDeleted) {
          comment.content = '**komentar telah dihapus**'
        }

        return {
          id: comment.id,
          content: comment.content,
          date: comment.date,
          username: comment.username
        }
      })

      return {
        ...this.thread,
        comments
      }
    }
}

export default GetDetailThreadAggregate
