import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper'
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper'
import CommentsTableTestHelper from '../../../../tests/CommentsTableTestHelper'
import LikeCommentRepositoryPostgres from '../LikeCommentRepositoryPostgres'
import pool from '../../database/postgres/pool'
import LikeCommentsTableTestHelper from '../../../../tests/LikeCommentsTableTestHelper'

describe('LikeCommentRepository', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
    await CommentsTableTestHelper.cleanTable()
    await LikeCommentsTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  it('should like comment properly', async () => {
    const userId = 'user-123'
    await UsersTableTestHelper.addUser({ id: userId })

    const threadId = 'thread-123'
    await ThreadsTableTestHelper.createThread(userId, { threadId })

    const commentId = 'comment-123'
    await CommentsTableTestHelper.createComment(userId, threadId, { commentId })

    const likeComment = {
      userId,
      commentId,
      isLiked: false
    }

    const likeCommentRepository = new LikeCommentRepositoryPostgres(pool)
    await likeCommentRepository.likeComment(likeComment)

    const likes = await LikeCommentsTableTestHelper.findLikeComments(userId, commentId)
    expect(likes).toHaveLength(1)
  })

  it('should unlike comment properly', async () => {
    const userId = 'user-123'
    await UsersTableTestHelper.addUser({ id: userId })

    const threadId = 'thread-123'
    await ThreadsTableTestHelper.createThread(userId, { threadId })

    const commentId = 'comment-123'
    await CommentsTableTestHelper.createComment(userId, threadId, { commentId })

    const likeComment = {
      userId,
      commentId,
      isLiked: false
    }

    const likeCommentRepository = new LikeCommentRepositoryPostgres(pool)
    await likeCommentRepository.unlikeComment(likeComment)

    const likes = await LikeCommentsTableTestHelper.findLikeComments(userId, commentId)
    expect(likes).toHaveLength(0)
  })

  describe('isUserHasLikedTheComment function', () => {
    it('should return true when comment is liked', async () => {
      const userId = 'user-123'
      await UsersTableTestHelper.addUser({ id: userId })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(userId, { threadId })

      const commentId = 'comment-123'
      await CommentsTableTestHelper.createComment(userId, threadId, { commentId })

      const likeComment = {
        userId,
        commentId,
        isLiked: false
      }

      const likeCommentRepository = new LikeCommentRepositoryPostgres(pool)
      await likeCommentRepository.likeComment(likeComment)

      const isUserHasLikedTheComment = await likeCommentRepository.isUserHasLikedTheComment(likeComment)
      expect(isUserHasLikedTheComment).toStrictEqual(true)
    })

    it('should return false when comment is not liked', async () => {
      const userId = 'user-123'
      const commentId = 'comment-123'

      const likeComment = {
        userId,
        commentId,
        isLiked: false
      }

      const likeCommentRepository = new LikeCommentRepositoryPostgres(pool)

      const isUserHasLikedTheComment = await likeCommentRepository.isUserHasLikedTheComment(likeComment)
      expect(isUserHasLikedTheComment).toStrictEqual(false)
    })
  })

  describe('getLikeCountCommentsByCommentIds', () => {
    it('should get likecount and commentid properly', async () => {
      const firstUser = 'user-123'
      await UsersTableTestHelper.addUser({ id: firstUser })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(firstUser, { threadId })

      const firstCommentId = 'comment-123'
      await CommentsTableTestHelper.createComment(firstUser, threadId, { commentId: firstCommentId })
      const secondCommentId = 'comment-2'
      await CommentsTableTestHelper.createComment(firstUser, threadId, { commentId: secondCommentId })

      const firstLikeComment = {
        userId: firstUser,
        commentId: firstCommentId,
        isLiked: false
      }

      const secondUserId = 'user-2'
      await UsersTableTestHelper.addUser({ id: secondUserId, username: 'udin' })

      const secondLikeComment = {
        userId: secondUserId,
        commentId: firstCommentId,
        isLiked: false
      }

      const thirdUserId = 'user-3'
      await UsersTableTestHelper.addUser({ id: thirdUserId, username: 'asep' })

      const thirdLikeComment = {
        userId: thirdUserId,
        commentId: secondCommentId,
        isLiked: false
      }

      const likeCommentRepository = new LikeCommentRepositoryPostgres(pool)

      await likeCommentRepository.likeComment(firstLikeComment)
      await likeCommentRepository.likeComment(secondLikeComment)
      await likeCommentRepository.likeComment(thirdLikeComment)

      const likeComment = await likeCommentRepository.getLikeCountCommentsByCommentIds([firstCommentId, secondCommentId])
      expect(likeComment).toStrictEqual([
        {
          commentId: firstCommentId,
          likeCount: 2
        },
        {
          commentId: secondCommentId,
          likeCount: 1
        }
      ])
    })
  })
})
