import ThreadRepository from '../../Domains/threads/ThreadRepository'
import NewThread from '../../Domains/threads/entities/NewThread'
import { Pool } from 'pg'
import IdGenerator from '../util/IdGenerator/IdGenerator'
import AddedThread from '../../Domains/threads/entities/AddedThread'
import ThreadDTO from '../../Domains/threads/model/RepositoryModel/ThreadDTO'

class ThreadRepositoryPostgres implements ThreadRepository {
    private pool: Pool
    private idGenerator: IdGenerator

    constructor (pool: Pool, idGenerator: IdGenerator) {
      this.pool = pool
      this.idGenerator = idGenerator
    }

    async getDetailThread (threadId: string): Promise<ThreadDTO> {
      const query = {
        text: `SELECT threads.*, users.username
               FROM threads
               JOIN users ON users.id = threads.user_id
               WHERE threads.id = $1`,
        values: [threadId]
      }
      const { rows, rowCount } = await this.pool.query(query)
      const thread = rows[0]

      if (!rowCount) {
        return undefined as unknown as ThreadDTO
      }

      return {
        body: thread.body,
        date: thread.created_at,
        id: thread.id,
        title: thread.title,
        username: thread.username
      }
    }

    async addThread (newThread: NewThread): Promise<AddedThread> {
      const threadId = `thread-${this.idGenerator.generate()}`
      const query = {
        text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id',
        values: [threadId, ...Object.values(newThread)]
      }

      const { rowCount } = await this.pool.query(query)
      if (!rowCount) {
        throw new Error('data gagal ditambahkan')
      }

      return new AddedThread(threadId, newThread)
    }

    async isThreadHasCreated (threadId: string): Promise<boolean> {
      const query = {
        text: 'SELECT id FROM threads WHERE id = $1',
        values: [threadId]
      }

      const { rowCount } = await this.pool.query(query)

      return !!rowCount
    }
}

export default ThreadRepositoryPostgres
