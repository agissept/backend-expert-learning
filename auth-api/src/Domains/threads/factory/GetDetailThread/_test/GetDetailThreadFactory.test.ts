import ThreadRepository from '../../../ThreadRepository'
import GetDetailThreadFactory from '../GetDetailThreadFactory'
import ThreadDTO from '../../../model/RepositoryModel/ThreadDTO'
import CommentDTO from '../../../../comment/model/RepositoryModel/CommentDTO'
import CommentRepository from '../../../../comment/CommentRepository'
import ReplyRepository from '../../../../replies/ReplyRepository'
import ReplyDTO from '../../../../replies/model/ReplyDTO'
import ThreadWithComments from '../../../model/DomainModel/ThreadWithComments'

describe('GetDetailThreadFactory', () => {
  it('should throw error when thread is not found', async () => {
    const threadId = 'thread-123'
    const threadRepository = <ThreadRepository>{}
    const commentRepository = <CommentRepository>{}
    const replyRepository = <ReplyRepository>{}

    const getDetailThreadFactory = new GetDetailThreadFactory(threadRepository, commentRepository, replyRepository)
    threadRepository.getDetailThread = jest.fn(() => Promise.resolve(undefined as unknown as ThreadDTO))

    await expect(getDetailThreadFactory.create(threadId)).rejects.toThrowError('GET_DETAIL_THREAD.THREAD_IS_NOT_FOUND')
  })

  it('should return detail thread properly', async () => {
    const threadId = 'thread-123'

    const thread: ThreadDTO = {
      id: threadId,
      title: 'sebuah judul thread',
      body: 'sebuah isi thread',
      date: Date.now().toString(),
      username: 'asep'
    }

    const comments: CommentDTO[] = [
      {
        id: 'comment-1',
        username: 'agis',
        date: Date.now().toString(),
        content: 'ini komentar pertama',
        isDeleted: false,
        userId: 'user-1'
      },
      {
        id: 'comment-2',
        username: 'asep',
        date: Date.now().toString(),
        content: 'ini komentar kedua',
        isDeleted: true,
        userId: 'user-2'
      }
    ]

    const replies: ReplyDTO[] = [{
      id: 'reply-1',
      userId: 'user-1',
      commentId: 'comment-1',
      content: 'balasan dari agis ke komentar 1',
      isDeleted: true,
      createdAt: Date.now().toString(),
      username: 'agis'
    },
    {
      id: 'reply-2',
      userId: 'user-2',
      commentId: 'comment-1',
      content: 'balasan dari asep ke komentar 1',
      isDeleted: false,
      createdAt: Date.now().toString(),
      username: 'asep'
    },
    {
      id: 'reply-3',
      userId: 'user-1',
      commentId: 'comment-2',
      content: 'balasan dari agis ke komentar 2',
      isDeleted: false,
      createdAt: Date.now().toString(),
      username: 'agis'
    },
    {
      id: 'reply-4',
      userId: 'user-2',
      commentId: 'comment-2',
      content: 'balasan dari asep ke komentar 2',
      isDeleted: false,
      createdAt: Date.now().toString(),
      username: 'asep'
    }]

    const expectedThread: ThreadWithComments = {
      id: thread.id,
      title: thread.title,
      body: thread.body,
      date: thread.date,
      username: thread.username,
      comments: [
        {
          id: comments[0].id,
          username: comments[0].username,
          date: comments[0].date,
          content: comments[0].content,
          replies: [
            {
              id: replies[0].id,
              username: replies[0].username,
              content: '**balasan telah dihapus**',
              date: replies[0].createdAt
            },
            {
              id: replies[1].id,
              username: replies[1].username,
              content: replies[1].content,
              date: replies[1].createdAt
            }
          ]
        },
        {
          id: comments[1].id,
          username: comments[1].username,
          date: comments[1].date,
          content: '**komentar telah dihapus**',
          replies: [
            {
              id: replies[2].id,
              username: replies[2].username,
              content: replies[2].content,
              date: replies[2].createdAt
            },
            {
              id: replies[3].id,
              username: replies[3].username,
              content: replies[3].content,
              date: replies[3].createdAt
            }
          ]
        }
      ]
    }
    const threadRepository = <ThreadRepository>{}
    const commentRepository = <CommentRepository>{}
    const replyRepository = <ReplyRepository>{}
    const getDetailThreadFactory = new GetDetailThreadFactory(threadRepository, commentRepository, replyRepository)
    threadRepository.getDetailThread = jest.fn(() => Promise.resolve(thread))
    commentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(comments))
    replyRepository.getRepliesByCommentIds = jest.fn(() => Promise.resolve(replies))

    const threadWithComments = await getDetailThreadFactory.create(threadId)
    expect(threadWithComments).toStrictEqual(expectedThread)
  })
})
