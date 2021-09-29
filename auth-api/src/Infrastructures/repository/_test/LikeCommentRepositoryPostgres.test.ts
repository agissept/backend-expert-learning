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

  describe('likeComment function', () => {
    it('should like comment properly', async () => {
      const userId = 'user-123'
      await UsersTableTestHelper.addUser({ id: userId })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(userId, { threadId })

      const commentId = 'comment-123'
      await CommentsTableTestHelper.createComment(userId, threadId, { commentId })

      const likeComment = {
        userId,
        commentId
      }

      const likeCommentRepository = new LikeCommentRepositoryPostgres(pool)
      await likeCommentRepository.likeComment(likeComment)

      const likes = await LikeCommentsTableTestHelper.findLikeComments(userId, commentId)
      expect(likes).toHaveLength(1)
    })
  })
})
