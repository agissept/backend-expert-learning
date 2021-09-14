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
})
