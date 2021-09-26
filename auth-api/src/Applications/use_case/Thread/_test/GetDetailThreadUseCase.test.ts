import ThreadDTO from '../../../../Domains/threads/model/RepositoryModel/ThreadDTO'
import CommentDTO from '../../../../Domains/comment/model/RepositoryModel/CommentDTO'
import GetDetailThreadUseCase from '../GetDetailThreadUseCase'
import ThreadRepository from '../../../../Domains/threads/ThreadRepository'
import Comment from '../../../../Domains/comment/model/DomainModel/Comment'
import ThreadWithComments from '../../../../Domains/threads/model/DomainModel/ThreadWithComments'
import CommentRepository from '../../../../Domains/comment/CommentRepository'

describe('GetDetailThreadUseCase', () => {
  it('should orchestrating the get detail thread action correctly ', async () => {
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
    const getDetailThreadUseCase = new GetDetailThreadUseCase({ threadRepository, commentRepository })
    threadRepository.getDetailThread = jest.fn(() => Promise.resolve(detailThreadFromDB))
    commentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve([firstComment, secondComment]))
    const detailThread = await getDetailThreadUseCase.execute(threadId)

    expect(expectedThread).toStrictEqual(detailThread)
    expect(threadRepository.getDetailThread).toBeCalledWith(threadId)
  })
})
