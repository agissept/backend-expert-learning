import GetDetailThreadAggregate from '../GetDetailThreadAggregate'
import ThreadDTO from '../../../model/RepositoryModel/ThreadDTO'
import CommentDTO from '../../../../comment/model/RepositoryModel/CommentDTO'
import ThreadWithComments from '../../../model/DomainModel/ThreadWithComments'
import Comment from '../../../../comment/model/DomainModel/Comment'

describe('GetDetailThreadAggregate', () => {
  it('should get detail thread properly', () => {
    const threadId = 'thread-123'

    const firstComment: CommentDTO = {
      id: 'comment-123',
      username: 'john',
      date: '2021-08-08T07:22:33.555Z',
      content: 'sebuah komentar',
      isDeleted: false,
      userId: 'john-123'
    }

    const secondComment: CommentDTO = {
      id: 'comment-321',
      username: 'asep',
      date: '2021-09-08T07:22:33.555Z',
      content: 'ini adalah komentar',
      isDeleted: true,
      userId: 'asep-123'
    }

    const commentsFromDB = [firstComment, secondComment]

    const threadFromDB: ThreadDTO = {
      id: threadId,
      title: 'sebuah judul thread',
      body: 'sebuah isi thread',
      date: '2021-08-08T07:19:09.775Z',
      username: 'agis'
    }

    const expectedFirstComment: Comment = {
      id: 'comment-123',
      username: 'john',
      date: '2021-08-08T07:22:33.555Z',
      content: 'sebuah komentar'
    }

    const expectedSecondComment: Comment = {
      id: 'comment-321',
      username: 'asep',
      date: '2021-09-08T07:22:33.555Z',
      content: '**komentar telah dihapus**'
    }

    const expectedThread: ThreadWithComments = {
      id: threadId,
      title: 'sebuah judul thread',
      body: 'sebuah isi thread',
      date: '2021-08-08T07:19:09.775Z',
      username: 'agis',
      comments: [expectedFirstComment, expectedSecondComment]
    }
    const getDetailThreadAggregate = new GetDetailThreadAggregate(threadFromDB, commentsFromDB)
    const thread = getDetailThreadAggregate.get()

    expect(thread).toStrictEqual(expectedThread)
  })
})
