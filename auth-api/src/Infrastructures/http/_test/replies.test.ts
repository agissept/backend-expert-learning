import pool from '../../database/postgres/pool'
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper'
import AuthenticationsTableTestHelper from '../../../../tests/AuthenticationsTableTestHelper'
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper'
import CommentsTableTestHelper from '../../../../tests/CommentsTableTestHelper'
import ReplyTableTestHelper from '../../../../tests/ReplyTableTestHelper'
import LoginTestHelper from '../../../../tests/LoginTestHelper'
import createServer from '../createServer'
import container from '../../container'

describe('/threads/{threadId}/comments/{commentId}/replies endpoint', () => {
  afterAll(async () => {
    await pool.end()
  })

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
    await AuthenticationsTableTestHelper.cleanTable()
    await ThreadsTableTestHelper.cleanTable()
    await CommentsTableTestHelper.cleanTable()
    await ReplyTableTestHelper.cleanTable()
  })

  describe('when post /threads/{threadId}/comments/{commentId}/replies', () => {
    it('should response 201 and new replies', async () => {
      const userId = 'user-123'
      const accessTokenThreadCreator = await LoginTestHelper.getUserAccessToken(userId)

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(userId, { threadId })

      const commentId = 'comment-123'
      await CommentsTableTestHelper.createComment(userId, threadId, { commentId })

      const replyPayload = {
        content: 'sebuah komentar'
      }

      const server = await createServer(container)
      const replyResponse = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments/${commentId}/replies`,
        payload: replyPayload,
        headers: {
          Authorization: `Bearer ${accessTokenThreadCreator}`
        }
      })

      const { addedReply } = JSON.parse(replyResponse.payload).data
      expect(replyResponse.statusCode).toStrictEqual(201)
      expect(addedReply.content).toStrictEqual(replyPayload.content)
      expect(addedReply.owner).toStrictEqual(userId)
    })
  })
})
