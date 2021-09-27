import IdGenerator from '../../util/IdGenerator/IdGenerator'
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper'
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper'
import pool from '../../database/postgres/pool'
import CommentsTableTestHelper from '../../../../tests/CommentsTableTestHelper'
import ReplyRepositoryPostgres from '../ReplyRepositoryPostgres'
import NewReply from '../../../Domains/replies/model/NewReply'
import ReplyTableTestHelper from '../../../../tests/ReplyTableTestHelper'
import { Pool } from 'pg'

describe('ReplyRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
    await CommentsTableTestHelper.cleanTable()
    await ReplyTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })
  describe('addReply function', () => {
    it('should throw error when add data is failed', () => {
      const newReply = <NewReply>{}
      const idGenerator = <IdGenerator>{}
      const pool = <Pool>{}

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, idGenerator)
      idGenerator.generate = jest.fn().mockImplementation(() => '123')
      pool.query = jest.fn().mockImplementation(() => Promise.reject)

      expect(replyRepositoryPostgres.addReply(newReply)).rejects.toThrowError('data gagal ditambahkan')
    })

    it('should persist reply and added reply correctly', async () => {
      const userId = 'user-123'
      await UsersTableTestHelper.addUser({ id: userId })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(userId, { threadId })

      const commentId = 'comment-123'
      await CommentsTableTestHelper.createComment(userId, threadId, { commentId })

      const reply: NewReply = {
        content: 'sebuah balasan',
        commentId,
        userId
      }
      const idGenerator = <IdGenerator>{}
      idGenerator.generate = jest.fn().mockImplementation(() => '123')
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, idGenerator)

      await replyRepositoryPostgres.addReply(reply)

      const replies = await ReplyTableTestHelper.findReplyById('reply-123')
      expect(replies).toHaveLength(1)
    })

    it('should return id reply correctly', async () => {
      const userId = 'user-123'
      await UsersTableTestHelper.addUser({ id: userId })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(userId, { threadId })

      const commentId = 'comment-123'
      await CommentsTableTestHelper.createComment(userId, threadId, { commentId })

      const reply: NewReply = {
        content: 'sebuah balasan',
        commentId,
        userId
      }
      const idGenerator = <IdGenerator>{}
      idGenerator.generate = jest.fn().mockImplementation(() => '123')
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, idGenerator)

      const addedReply = await replyRepositoryPostgres.addReply(reply)

      expect(addedReply).toStrictEqual('reply-123')
    })
  })
})
