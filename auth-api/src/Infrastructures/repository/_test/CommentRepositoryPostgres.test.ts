import IdGenerator from '../../util/IdGenerator/IdGenerator'
import CommentRepositoryPostgres from '../CommentRepositoryPostgres'
import NewComment from '../../../Domains/comment/model/DomainModel/NewComment'
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper'
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper'
import pool from '../../database/postgres/pool'
import CommentsTableTestHelper from '../../../../tests/CommentsTableTestHelper'
import { Pool } from 'pg'
import ThreadRepositoryPostgres from '../ThreadRepositoryPostgres'
import NewThreadFactory from '../../../Domains/threads/factory/NewThread/NewThreadFactory'

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
    await CommentsTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('addComment function', () => {
    it('should throw error when add data is failed', () => {
      const newComment = <NewComment>{}
      const idGenerator = <IdGenerator>{}
      const pool = <Pool>{}

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, idGenerator)
      idGenerator.generate = jest.fn().mockImplementation(() => '123')
      pool.query = jest.fn().mockImplementation(() => Promise.reject)

      expect(commentRepositoryPostgres.addComment(newComment)).rejects.toThrowError('data gagal ditambahkan')
    })

    it('should persist comment and added comment correctly', async () => {
      const userId = 'user-123'
      await UsersTableTestHelper.addUser({ id: userId })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(userId, { threadId })

      const comment: NewComment = {
        content: 'Sebuah comment',
        threadId,
        userId
      }
      const idGenerator = <IdGenerator>{}
      idGenerator.generate = jest.fn().mockImplementation(() => '123')
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, idGenerator)

      await commentRepositoryPostgres.addComment(comment)

      const comments = await CommentsTableTestHelper.findCommentById('comment-123')
      expect(comments).toHaveLength(1)
    })

    it('should return id comment correctly', async () => {
      const userId = 'user-123'
      await UsersTableTestHelper.addUser({ id: userId })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(userId, { threadId })

      const comment: NewComment = {
        content: 'Sebuah comment',
        threadId,
        userId
      }
      const idGenerator = <IdGenerator>{}
      idGenerator.generate = jest.fn().mockImplementation(() => '123')
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, idGenerator)

      const addedComment = await commentRepositoryPostgres.addComment(comment)

      expect(addedComment).toStrictEqual('comment-123')
    })
  })

  describe('getCommentsByThreadId', () => {
    it('should return array empty when thread not found', () => {
      const idGenerator = <IdGenerator>{}
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, idGenerator)

      return expect(commentRepositoryPostgres.getCommentsByThreadId('dicoding'))
        .resolves
        .toStrictEqual([])
    })

    it('should return CommentDTO[] when coment is found', async () => {
      const registerUserId = 'user-123'
      const registerUsername = 'asep'
      await UsersTableTestHelper.addUser({ id: registerUserId, username: registerUsername })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(registerUserId, { threadId })

      const comment: NewComment = {
        content: 'Sebuah comment',
        threadId,
        userId: registerUserId
      }
      const idGenerator = <IdGenerator>{}
      idGenerator.generate = jest.fn().mockImplementation(() => '123')
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, idGenerator)

      await commentRepositoryPostgres.addComment(comment)

      const addedComment = await commentRepositoryPostgres.getCommentsByThreadId(threadId)
      const { userId, content, isDeleted, username } = addedComment[0]

      expect(userId).toStrictEqual(registerUserId)
      expect(content).toStrictEqual(comment.content)
      expect(isDeleted).toStrictEqual(false)
      expect(username).toStrictEqual(registerUsername)
    })
  })

  describe('getDetailComment', () => {
    it('should return undefined when thread not found', () => {
      const idGenerator = <IdGenerator>{}
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, idGenerator)

      return expect(commentRepositoryPostgres.getDetailComment('dicoding'))
        .resolves
        .toStrictEqual(undefined)
    })

    it('should return CommentDTO when coment is found', async () => {
      const registerUserId = 'user-123'
      const registerUsername = 'asep'
      await UsersTableTestHelper.addUser({ id: registerUserId, username: registerUsername })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(registerUserId, { threadId })

      const comment: NewComment = {
        content: 'Sebuah comment',
        threadId,
        userId: registerUserId
      }
      const idGenerator = <IdGenerator>{}
      idGenerator.generate = jest.fn().mockImplementation(() => '123')
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, idGenerator)

      await commentRepositoryPostgres.addComment(comment)

      const { userId, content, isDeleted, username } = await commentRepositoryPostgres.getDetailComment('comment-123')

      expect(userId).toStrictEqual(registerUserId)
      expect(content).toStrictEqual(comment.content)
      expect(isDeleted).toStrictEqual(false)
      expect(username).toStrictEqual(registerUsername)
    })
  })

  describe('softDeleteComment', () => {
    it('should soft delete comment properly', async () => {
      const registerUserId = 'user-123'
      const registerUsername = 'asep'
      await UsersTableTestHelper.addUser({ id: registerUserId, username: registerUsername })

      const threadId = 'thread-123'
      await ThreadsTableTestHelper.createThread(registerUserId, { threadId })

      const comment: NewComment = {
        content: 'Sebuah comment',
        threadId,
        userId: registerUserId
      }
      const idGenerator = <IdGenerator>{}
      idGenerator.generate = jest.fn().mockImplementation(() => '123')
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, idGenerator)

      await commentRepositoryPostgres.addComment(comment)

      await commentRepositoryPostgres.softDeleteComment('comment-123')
      const { userId, content, isDeleted, username } = await commentRepositoryPostgres.getDetailComment('comment-123')

      expect(userId).toStrictEqual(registerUserId)
      expect(content).toStrictEqual(comment.content)
      expect(isDeleted).toStrictEqual(true)
      expect(username).toStrictEqual(registerUsername)
    })
  })

  describe('isCommentHasCreated', () => {
    it('should return false when comment not created', async () => {
      const idGenerator = <IdGenerator>{}
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, idGenerator)

      await expect(commentRepositoryPostgres.isCommentHasCreated('thread-123')).resolves.toStrictEqual(false)
    })
    it('should return true when comment has created', async () => {
      const userId = 'user-123'
      await UsersTableTestHelper.addUser({ id: userId })

      const idGenerator = <IdGenerator>{}
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, idGenerator)
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, idGenerator)
      idGenerator.generate = jest.fn().mockImplementation(() => '123')

      const thread = new NewThreadFactory().create({
        title: 'sebuah thread',
        body: 'sebuah content'
      }, userId)

      const { id: threadId } = await threadRepositoryPostgres.addThread(thread)

      const comment: NewComment = {
        content: 'sebuah komentar',
        threadId,
        userId
      }

      await commentRepositoryPostgres.addComment(comment)

      await expect(threadRepositoryPostgres.isThreadHasCreated('thread-123')).resolves.toStrictEqual(true)
    })
  })
})
