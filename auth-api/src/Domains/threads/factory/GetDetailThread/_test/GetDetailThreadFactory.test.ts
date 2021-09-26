import ThreadRepository from '../../../ThreadRepository'
import GetDetailThreadFactory from '../GetDetailThreadFactory'
import ThreadDTO from '../../../model/RepositoryModel/ThreadDTO'
import CommentDTO from '../../../../comment/model/RepositoryModel/CommentDTO'
import CommentRepository from '../../../../comment/CommentRepository'
import ThreadWithComments from '../../../model/DomainModel/ThreadWithComments'
import Comment from '../../../../comment/model/DomainModel/Comment'

describe('GetDetailThreadFactory', () => {
  it('should throw error when thread is not found', async () => {
    const threadId = 'thread-123'
    const threadRepository = <ThreadRepository>{}
    const commentRepository = <CommentRepository>{}
    const getDetailThreadFactory = new GetDetailThreadFactory(threadRepository, commentRepository)
    threadRepository.getDetailThread = jest.fn(() => Promise.resolve(undefined as unknown as ThreadDTO))

    await expect(getDetailThreadFactory.create(threadId)).rejects.toThrowError('GET_DETAIL_THREAD.THREAD_IS_NOT_FOUND')
  })

  it('should return detail thread properly', async () => {
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

    const commentFromDB = [firstComment, secondComment]

    const detailThreadFromDB: ThreadDTO = {
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

    const threadRepository = <ThreadRepository>{}
    const commentRepository = <CommentRepository>{}
    const getDetailThreadFactory = new GetDetailThreadFactory(threadRepository, commentRepository)
    threadRepository.getDetailThread = jest.fn(() => Promise.resolve(detailThreadFromDB))
    commentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(commentFromDB))

    const thread = await getDetailThreadFactory.create(threadId)
    expect(thread).toStrictEqual(expectedThread)
  })
})
