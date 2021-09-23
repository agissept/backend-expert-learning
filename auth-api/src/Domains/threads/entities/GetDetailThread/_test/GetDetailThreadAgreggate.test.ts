import GetDetailThreadAggregate from '../GetDetailThreadAggregate'
import DetailThread from '../../../model/DetailThread'
import DetailComment from '../../../../comment/model/DetailComment'

describe('GetDetailThreadAggregate', () => {
  it('should get detail thread properly', () => {
    const threadId = 'thread-123'

    const firstComment: DetailComment = {
      id: 'comment-123',
      userId: 'john',
      date: '2021-08-08T07:22:33.555Z',
      content: 'sebuah komentar',
      deleted: false
    }

    const secondComment: DetailComment = {
      id: 'comment-321',
      userId: 'asep',
      date: '2021-09-08T07:22:33.555Z',
      content: 'ini adalah komentar',
      deleted: true
    }

    const detailThreadFromDB: DetailThread = {
      id: threadId,
      title: 'sebuah judul thread',
      body: 'sebuah isi thread',
      date: '2021-08-08T07:19:09.775Z',
      username: 'agis',
      comments: [firstComment, secondComment]
    }

    const expectedFirstComment: DetailComment = {
      id: 'comment-123',
      userId: 'john',
      date: '2021-08-08T07:22:33.555Z',
      content: 'sebuah komentar',
      deleted: false
    }

    const expectedSecondComment: DetailComment = {
      id: 'comment-321',
      userId: 'asep',
      date: '2021-09-08T07:22:33.555Z',
      content: '**komentar telah dihapus**',
      deleted: true
    }

    const expectedThread: DetailThread = {
      id: threadId,
      title: 'sebuah judul thread',
      body: 'sebuah isi thread',
      date: '2021-08-08T07:19:09.775Z',
      username: 'agis',
      comments: [expectedFirstComment, expectedSecondComment]
    }
    const getDetailThreadAggregate = new GetDetailThreadAggregate(detailThreadFromDB)
    const thread = getDetailThreadAggregate.get()

    expect(thread).toStrictEqual(expectedThread)
  })
})
