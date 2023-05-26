import CommentDTO from '../../../model/RepositoryModel/CommentDTO'
import ReplyDTO from '../../../../replies/model/ReplyDTO'
import CommentWithReplies from '../../../model/DomainModel/CommentWithReplies'
import GetCommentsWithRepliesAggregate from '../GetCommentsWithRepliesAggregate'
import LikedCommentsCount from '../../../../likes/model/LikedCommentsCount'

describe('GetCommentsWithRepliesFactory', () => {
  it('should return right content when deleted comment is true', () => {
    const comments: CommentDTO[] = [
      {
        id: 'comment-1',
        username: 'agis',
        date: Date.now().toString(),
        content: 'ini komentar pertama',
        isDeleted: true,
        userId: 'user-1'
      }
    ]
    const expectedComments: CommentWithReplies[] = [{
      content: '**komentar telah dihapus**',
      date: comments[0].date,
      id: comments[0].id,
      username: comments[0].username,
      likeCount: 0,
      replies: []

    }]

    const replies = [] as ReplyDTO[]

    const commentsLikeCount = [] as LikedCommentsCount[]

    const getCommentWithReplies = new GetCommentsWithRepliesAggregate(replies, comments, commentsLikeCount)
    const commentsWithReplies = getCommentWithReplies.get()

    expect(commentsWithReplies).toStrictEqual(expectedComments)
  })

  it('should return right content when deleted reply is true', () => {
    const comments: CommentDTO[] = [
      {
        id: 'comment-1',
        username: 'agis',
        date: Date.now().toString(),
        content: 'ini komentar pertama',
        isDeleted: false,
        userId: 'user-1'
      }
    ]
    const replies: ReplyDTO[] = [
      {
        id: 'reply-1',
        userId: 'user-1',
        commentId: 'comment-1',
        content: 'balasan dari agis ke komentar 1',
        isDeleted: true,
        createdAt: Date.now().toString(),
        username: 'agis'
      }
    ]

    const expectedComments: CommentWithReplies[] = [{
      content: comments[0].content,
      date: comments[0].date,
      id: comments[0].id,
      username: comments[0].username,
      likeCount: 0,
      replies: [
        {
          id: replies[0].id,
          content: '**balasan telah dihapus**',
          date: replies[0].createdAt,
          username: replies[0].username
        }
      ]
    }]
    const commentsLikeCount = [] as LikedCommentsCount[]

    const getCommentWithReplies = new GetCommentsWithRepliesAggregate(replies, comments, commentsLikeCount)
    const commentsWithReplies = getCommentWithReplies.get()

    expect(commentsWithReplies).toStrictEqual(expectedComments)
  })

  it('should return comments with replies', () => {
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

    const commentsLikeCount = [] as LikedCommentsCount[]

    const getCommentWithReplies = new GetCommentsWithRepliesAggregate(replies, comments, commentsLikeCount)
    const commentsWithReplies = getCommentWithReplies.get()

    expect(commentsWithReplies).toStrictEqual(expectedCommentsWithReplies)
  })
})
