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

  describe('getRepliesByIds', () => {
    it('should return [] when replies not found', () => {
      const idGenerator = <IdGenerator>{}
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, idGenerator)

      return expect(replyRepositoryPostgres.getRepliesByCommentIds(['dicoding']))
        .resolves
        .toStrictEqual([])
    })

    it('should return ReplyDTO[] when replies is found', async () => {
      const registerUserId = 'user-123'
      const registerUsername = 'asep'
      await UsersTableTestHelper.addUser({ id: registerUserId, username: registerUsername })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(registerUserId, { threadId })

      const commentId = 'comment-123'
      await CommentsTableTestHelper.createComment(registerUserId, threadId, { commentId })

      const idGenerator = <IdGenerator>{}
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, idGenerator)
      idGenerator.generate = jest.fn().mockImplementation(() => '123')

      const reply: NewReply = {
        commentId,
        content: 'sebuah balasan',
        userId: registerUserId
      }

      await replyRepositoryPostgres.addReply(reply)

      const replies = await replyRepositoryPostgres.getRepliesByCommentIds([commentId])

      expect(replies[0].commentId).toStrictEqual(commentId)
      expect(replies[0].content).toStrictEqual(reply.content)
      expect(replies[0].id).toStrictEqual('reply-123')
      expect(replies[0].isDeleted).toStrictEqual(false)
      expect(replies[0].userId).toStrictEqual(registerUserId)
      expect(replies[0].username).toStrictEqual(registerUsername)
    })
  })

  describe('getReplyById', () => {
    it('should return undefined when reply not found', () => {
      const idGenerator = <IdGenerator>{}
      const replyRepository = new ReplyRepositoryPostgres(pool, idGenerator)

      return expect(replyRepository.getReplyById('dicoding')).resolves.toStrictEqual(undefined)
    })

    it('should return ReplyDTO when reply is found', async () => {
      const userId = 'user-123'
      const registerUsername = 'asep'
      await UsersTableTestHelper.addUser({ id: userId, username: registerUsername })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(userId, { threadId })

      const commentId = 'comment-123'
      await CommentsTableTestHelper.createComment(userId, threadId, { commentId })

      const replyId = 'reply-123'
      const replyContent = 'sebuah balasan'
      await ReplyTableTestHelper.createReply(userId, commentId, { replyId, content: replyContent })

      const idGenerator = <IdGenerator>{}
      const replyRepository = new ReplyRepositoryPostgres(pool, idGenerator)

      const reply = await replyRepository.getReplyById(replyId)

      expect(reply?.id).toStrictEqual(replyId)
      expect(reply?.userId).toStrictEqual(userId)
      expect(reply?.commentId).toStrictEqual(commentId)
      expect(reply?.content).toStrictEqual(replyContent)
      expect(reply?.isDeleted).toStrictEqual(false)
      expect(reply?.username).toStrictEqual(registerUsername)
    })
  })

  describe('softDeleteReply', () => {
    it('should soft delete reply properly', async () => {
      const registerUserId = 'user-123'
      const registerUsername = 'asep'
      await UsersTableTestHelper.addUser({ id: registerUserId, username: registerUsername })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(registerUserId, { threadId })

      const commentId = 'comment-123'
      await CommentsTableTestHelper.createComment(registerUserId, threadId, { commentId })

      const replyId = 'reply-123'
      const replyContent = 'sebuah balasan'
      await ReplyTableTestHelper.createReply(registerUserId, commentId, { replyId, content: replyContent })

      const idGenerator = <IdGenerator>{}
      const replyRepository = new ReplyRepositoryPostgres(pool, idGenerator)

      await replyRepository.softDeleteReply(replyId)

      const reply = await replyRepository.getReplyById(replyId)

      expect(reply?.id).toStrictEqual(replyId)
      expect(reply?.userId).toStrictEqual(registerUserId)
      expect(reply?.commentId).toStrictEqual(commentId)
      expect(reply?.content).toStrictEqual(replyContent)
      expect(reply?.isDeleted).toStrictEqual(true)
      expect(reply?.username).toStrictEqual(registerUsername)
    })
  })
})
