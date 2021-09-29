import createServer from '../createServer'
import container from '../../container'
import LoginTestHelper from '../../../../tests/LoginTestHelper'
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper'
import AuthenticationsTableTestHelper from '../../../../tests/AuthenticationsTableTestHelper'
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper'
import CommentsTableTestHelper from '../../../../tests/CommentsTableTestHelper'
import LikeCommentsTableTestHelper from '../../../../tests/LikeCommentsTableTestHelper'

describe('/threads/{threadId}/comments endpoint', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
    await AuthenticationsTableTestHelper.cleanTable()
    await ThreadsTableTestHelper.cleanTable()
    await CommentsTableTestHelper.cleanTable()
    await LikeCommentsTableTestHelper.cleanTable()
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

  describe('when delete /threads/{threadId}/comments', () => {
    it('should response 200', async () => {
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
      const commentId = JSON.parse(commentResponse.payload).data.addedComment.id

      const deleteCommentResponse = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${accessTokenCommentCreator}`
        }
      })

      const { status } = JSON.parse(deleteCommentResponse.payload)
      expect(deleteCommentResponse.statusCode).toStrictEqual(200)
      expect(status).toStrictEqual('success')
    })
  })

  describe('when put /threads/{threadId}/comments/likes', () => {
    it('should response 200 and liked the commment', async () => {
      const userId = 'user-123'
      const accessToken = await LoginTestHelper.getUserAccessToken(userId)

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(userId, { threadId })

      const commentId = 'comment-123'
      await CommentsTableTestHelper.createComment(userId, threadId, { commentId })

      const server = await createServer(container)
      const likeCommentResponse = await server.inject({
        method: 'PUT',
        url: `/threads/${threadId}/comments/${commentId}/likes`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      const likedComments = await LikeCommentsTableTestHelper.findLikeComments(userId, commentId)
      expect(likeCommentResponse.statusCode).toStrictEqual(200)
      expect(likedComments).toHaveLength(1)
      expect(likedComments[0]).toStrictEqual({
        user_id: userId,
        comment_id: commentId
      })
    })
    it('should response 200 and unliked the commment', async () => {
      const userId = 'user-123'
      const accessToken = await LoginTestHelper.getUserAccessToken(userId)

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(userId, { threadId })

      const commentId = 'comment-123'
      await CommentsTableTestHelper.createComment(userId, threadId, { commentId })

      const server = await createServer(container)
      await server.inject({
        method: 'PUT',
        url: `/threads/${threadId}/comments/${commentId}/likes`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      const unlikeCommentResponse = await server.inject({
        method: 'PUT',
        url: `/threads/${threadId}/comments/${commentId}/likes`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      const unlikedComments = await LikeCommentsTableTestHelper.findLikeComments(userId, commentId)
      expect(unlikeCommentResponse.statusCode).toStrictEqual(200)
      expect(unlikedComments).toHaveLength(0)
    })
  })
})
