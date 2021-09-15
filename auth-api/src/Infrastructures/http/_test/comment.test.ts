import createServer from '../createServer'
import container from '../../container'
import LoginTestHelper from '../../../../tests/LoginTestHelper'
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper'
import AuthenticationsTableTestHelper from '../../../../tests/AuthenticationsTableTestHelper'

describe('/threads/{threadId}/comments endpoint', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
    await AuthenticationsTableTestHelper.cleanTable()
  })
  describe('when post /threads/{threadId}/comments', () => {
    it('should response 201 and new comment', async () => {
      const threadCreator = 'user-112'

      const threadPayload = {
        title: 'ini adalah thread user-1',
        body: 'ini adalah judul'
      }

      const server = await createServer(container)
      const accessTokenThreadCreator = await LoginTestHelper.getUserAccessToken(threadCreator)
      const threadResponse = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: threadPayload,
        headers: {
          Authorization: `Bearer ${accessTokenThreadCreator}`
        }
      })

      const threadId = JSON.parse(threadResponse.payload).data.addedThread.id
      const commentCreator = 'user-3'
      const commentCreatorUsername = 'comment-user'
      const accessTokenCommentCreator = await LoginTestHelper.getUserAccessToken(commentCreator, commentCreatorUsername)
      const commentPayload = {
        content: 'ini adalah komentar'
      }

      const commentResponse = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: commentPayload,
        headers: {
          Authorization: `Bearer ${accessTokenCommentCreator}`
        }
      })

      const { addedComment } = JSON.parse(commentResponse.payload).data
      expect(commentResponse.statusCode).toStrictEqual(201)
      expect(addedComment.content).toStrictEqual(commentPayload.content)
      expect(addedComment.owner).toStrictEqual(commentCreator)
    })
  })
})
