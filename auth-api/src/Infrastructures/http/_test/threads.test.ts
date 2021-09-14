import createServer from '../createServer'
import container from '../../container'
import LoginTestHelper from '../../../../tests/LoginTestHelper'
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper'
import AuthenticationsTableTestHelper from '../../../../tests/AuthenticationsTableTestHelper'

describe('/threads endpoint', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
    await AuthenticationsTableTestHelper.cleanTable()
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
  })
})
