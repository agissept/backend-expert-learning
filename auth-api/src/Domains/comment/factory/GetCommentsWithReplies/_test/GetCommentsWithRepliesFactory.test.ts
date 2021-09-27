import GetCommentsWithRepliesFactory from '../GetCommentsWithRepliesFactory'
import IdGenerator from '../../../../../Infrastructures/util/IdGenerator/IdGenerator'
import CommentRepository from '../../../CommentRepository'
import ReplyRepository from '../../../../replies/ReplyRepository'
import CommentDTO from '../../../model/RepositoryModel/CommentDTO'
import ReplyDTO from '../../../../replies/model/ReplyDTO'
import CommentWithReplies from '../../../model/DomainModel/CommentWithReplies'

describe('GetCommentsWithRepliesFactory', () => {
  it('should return comments with replies', async () => {
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

    const expectedCommentsWithReplies: CommentWithReplies[] = [
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

    const threadId = 'thread-123'
    const idGenerator = <IdGenerator>{}
    idGenerator.generate = jest.fn(() => '123')

    const replyRepository = <ReplyRepository>{}
    const commentRepository = <CommentRepository>{}
    const factory = new GetCommentsWithRepliesFactory(commentRepository, replyRepository)
    commentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(comments))
    replyRepository.getRepliesByCommentIds = jest.fn(() => Promise.resolve(replies))

    const commentsWithReplies = await factory.create(threadId)
    expect(commentsWithReplies).toStrictEqual(expectedCommentsWithReplies)
  })
})
