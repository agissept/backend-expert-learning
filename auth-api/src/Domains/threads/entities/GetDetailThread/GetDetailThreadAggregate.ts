import DetailThread from '../../model/DetailThread'

class GetDetailThreadAggregate {
    private readonly thread: DetailThread;

    constructor (thread: DetailThread) {
      this.thread = thread
    }

    get () {
      this.thread.comments = this.thread.comments.map(comment => {
        if (comment.deleted) {
          comment.content = '**komentar telah dihapus**'
        }
        return comment
      })

      return this.thread
    }
}

export default GetDetailThreadAggregate
