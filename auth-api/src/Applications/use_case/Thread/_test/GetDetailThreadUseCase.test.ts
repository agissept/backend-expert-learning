import ThreadDTO from '../../../../Domains/threads/model/RepositoryModel/ThreadDTO'
import CommentDTO from '../../../../Domains/comment/model/RepositoryModel/CommentDTO'
import GetDetailThreadUseCase from '../GetDetailThreadUseCase'
import ThreadRepository from '../../../../Domains/threads/ThreadRepository'
import ThreadWithComments from '../../../../Domains/threads/model/DomainModel/ThreadWithComments'
import CommentRepository from '../../../../Domains/comment/CommentRepository'
import ReplyRepository from '../../../../Domains/replies/ReplyRepository'
import ReplyDTO from '../../../../Domains/replies/model/ReplyDTO'
import LikeCommentRepository from '../../../../Domains/likes/LikeCommentRepository'

describe('GetDetailThreadUseCase', () => {
  it('should orchestrating the get detail thread action correctly ', async () => {
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
          likeCount: 0,
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
          likeCount: 0,
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
    const likeCommentRepository = <LikeCommentRepository>{}
    const getDetailThreadUseCase = new GetDetailThreadUseCase({ threadRepository, commentRepository, replyRepository, likeCommentRepository })
    threadRepository.getDetailThread = jest.fn(() => Promise.resolve(thread))
    commentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(comments))
    replyRepository.getRepliesByCommentIds = jest.fn(() => Promise.resolve(replies))
    likeCommentRepository.getLikeCountCommentsByCommentIds = jest.fn(() => Promise.resolve([]))
    const detailThread = await getDetailThreadUseCase.execute(threadId)

    expect(expectedThread).toStrictEqual(detailThread)
    expect(threadRepository.getDetailThread).toBeCalledWith(threadId)
  })
})
