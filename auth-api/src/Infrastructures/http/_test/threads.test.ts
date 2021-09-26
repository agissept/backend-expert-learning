import createServer from '../createServer'
import container from '../../container'
import LoginTestHelper from '../../../../tests/LoginTestHelper'
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper'
import AuthenticationsTableTestHelper from '../../../../tests/AuthenticationsTableTestHelper'
import pool from '../../database/postgres/pool'

describe('/threads endpoint', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
    await AuthenticationsTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('when POST /threads', () => {
    it('should response 201 and new thread ', async () => {
      const requestPayload = {
        title: 'ini adalah judul',
        body: 'ini adalah konten'
      }

      const server = await createServer(container)
      const userId = 'user-123'
      const accessToken = await LoginTestHelper.getUserAccessToken(userId)

      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(201)
      expect(responseJson.data.addedThread.id).toBeDefined()
      expect(responseJson.data.addedThread.title).toEqual(requestPayload.title)
      expect(responseJson.data.addedThread.owner).toEqual(userId)
    })

    it('should response 401 when unauthenticated ', async () => {
      const requestPayload = {
        title: 'ini adalah judul',
        body: 'ini adalah konten'
      }

      const server = await createServer(container)

      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload
      })

      expect(response.statusCode).toEqual(401)
    })

    it('should response 400 when payload is bad ', async () => {
      const requestPayload = {
        title: 'ini adalah judul'
      }

      const server = await createServer(container)
      const userId = 'user-123'
      const accessToken = await LoginTestHelper.getUserAccessToken(userId)

      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada')
    })
  })

  describe('when GET /threads/{threadId}', () => {
    it('should should return 200 and thread', async () => {
      const threadCreatorId = 'user-112'
      const threadCreatorUserame = 'asep'

      const threadPayload = {
        title: 'ini adalah thread user-1',
        body: 'ini adalah judul'
      }

      const server = await createServer(container)
      const accessTokenThreadCreator = await LoginTestHelper.getUserAccessToken(threadCreatorId, threadCreatorUserame)
      const threadResponse = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: threadPayload,
        headers: {
          Authorization: `Bearer ${accessTokenThreadCreator}`
        }
      })

      const threadId = JSON.parse(threadResponse.payload).data.addedThread.id
      const commentCreatorId = 'user-3'
      const commentCreatorUsername = 'comment-user'
      const accessTokenCommentCreator = await LoginTestHelper.getUserAccessToken(commentCreatorId, commentCreatorUsername)
      const firstCommentPayload = {
        content: 'ini adalah komentar'
      }
      const secondCommentPayload = {
        content: 'ini komentar kedua'
      }

      const secondCommentResponse = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: secondCommentPayload,
        headers: {
          Authorization: `Bearer ${accessTokenCommentCreator}`
        }
      })

      const firstCommentResponse = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: firstCommentPayload,
        headers: {
          Authorization: `Bearer ${accessTokenCommentCreator}`
        }
      })
      const firstCommentId = JSON.parse(firstCommentResponse.payload).data.addedComment.id
      const secondCommentId = JSON.parse(secondCommentResponse.payload).data.addedComment.id

      await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${firstCommentId}`,
        headers: {
          Authorization: `Bearer ${accessTokenCommentCreator}`
        }
      })

      const getThreadResponse = await server.inject({
        method: 'GET',
        url: `/threads/${threadId}`
      })

      const expectedThread = {
        id: threadId,
        title: threadPayload.title,
        body: threadPayload.body,
        username: threadCreatorUserame,
        comments: [{
          id: secondCommentId,
          username: commentCreatorUsername,
          content: secondCommentPayload.content
        },
        {
          id: firstCommentId,
          username: commentCreatorUsername,
          content: '**komentar telah dihapus**'
        }]
      }

      const { thread } = await JSON.parse(getThreadResponse.payload).data
      expect(getThreadResponse.statusCode).toStrictEqual(200)

      // delete date property because its generated by postgre
      delete thread.date
      thread.comments.forEach((comment: any) => {
        delete comment.date
      })

      expect(thread).toStrictEqual(expectedThread)
    })
  })
})
