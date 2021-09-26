import { Pool } from 'pg'
import IdGenerator from '../../util/IdGenerator/IdGenerator'
import ThreadRepositoryPostgres from '../ThreadRepositoryPostgres'
import NewThread from '../../../Domains/threads/model/DomainModel/NewThread'
import pool from '../../database/postgres/pool'
import NewThreadFactory from '../../../Domains/threads/factory/NewThread/NewThreadFactory'
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper'
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper'

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('addUser function', () => {
    it('should throw error when add data is failed', function () {
      const newThread = {} as NewThread
      const pool = <Pool>{}
      const idGenerator = <IdGenerator>{}

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, idGenerator)
      idGenerator.generate = jest.fn().mockImplementation(() => '123')
      pool.query = jest.fn().mockImplementation(() => Promise.reject)

      expect(threadRepositoryPostgres.addThread(newThread)).rejects.toThrowError('data gagal ditambahkan')
    })

    it('should persist thread and added thread correctly', async () => {
      const userId = 'user-123'
      await UsersTableTestHelper.addUser({ id: userId })
      const thread = new NewThreadFactory().create({
        title: 'sebuah thread',
        body: 'sebuah content'
      }, userId)

      const idGenerator = <IdGenerator>{}
      idGenerator.generate = jest.fn().mockImplementation(() => '123')
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, idGenerator)

      await threadRepositoryPostgres.addThread(thread)

      const threads = await ThreadsTableTestHelper.findThreadById('thread-123')
      expect(threads).toHaveLength(1)
    })

    it('should return added thread correctly', async () => {
      const userId = 'user-123'
      await UsersTableTestHelper.addUser({ id: userId })
      const thread = new NewThreadFactory().create({
        title: 'sebuah thread',
        body: 'sebuah content'
      }, userId)

      const idGenerator = <IdGenerator>{}
      idGenerator.generate = jest.fn().mockImplementation(() => '123')
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, idGenerator)

      const addedThread = await threadRepositoryPostgres.addThread(thread)

      expect(addedThread).toStrictEqual({ id: 'thread-123', owner: userId, title: thread.title })
    })
  })

  describe('getDetailThread', () => {
    it('should return undefined when thread not found', () => {
      const idGenerator = <IdGenerator>{}
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, idGenerator)

      return expect(threadRepositoryPostgres.getDetailThread('dicoding')).resolves.toStrictEqual(undefined)
    })

    it('should return ThreadDTO when thread is found', async () => {
      const userId = 'user-123'
      const registerUsername = 'asep'
      await UsersTableTestHelper.addUser({ id: userId, username: registerUsername })

      const idGenerator = <IdGenerator>{}
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, idGenerator)
      idGenerator.generate = jest.fn().mockImplementation(() => '123')

      const thread = new NewThreadFactory().create({
        title: 'sebuah thread',
        body: 'sebuah content'
      }, userId)

      await threadRepositoryPostgres.addThread(thread)
      const { body, id, title, username } = await threadRepositoryPostgres.getDetailThread('thread-123')

      expect(id).toStrictEqual('thread-123')
      expect(title).toStrictEqual(thread.title)
      expect(body).toStrictEqual(thread.body)
      expect(username).toStrictEqual(registerUsername)
    })
  })

  describe('isThreadHasCreated', () => {
    it('should return false when thread not created', async () => {
      const idGenerator = <IdGenerator>{}
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, idGenerator)

      await expect(threadRepositoryPostgres.isThreadHasCreated('thread-123')).resolves.toStrictEqual(false)
    })
    it('should return true when thread has created', async () => {
      const userId = 'user-123'
      await UsersTableTestHelper.addUser({ id: userId })

      const idGenerator = <IdGenerator>{}
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, idGenerator)
      idGenerator.generate = jest.fn().mockImplementation(() => '123')

      const thread = new NewThreadFactory().create({
        title: 'sebuah thread',
        body: 'sebuah content'
      }, userId)

      await threadRepositoryPostgres.addThread(thread)

      await expect(threadRepositoryPostgres.isThreadHasCreated('thread-123')).resolves.toStrictEqual(true)
    })
  })
})
