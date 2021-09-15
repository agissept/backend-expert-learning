import ThreadRepository from '../../Domains/threads/ThreadRepository'
import NewThread from '../../Domains/threads/entities/NewThread'
import { Pool } from 'pg'
import IdGenerator from '../util/IdGenerator/IdGenerator'
import AddedThread from '../../Domains/threads/entities/AddedThread'

class ThreadRepositoryPostgres implements ThreadRepository {
    private pool: Pool
    private idGenerator: IdGenerator
    constructor (pool: Pool, idGenerator: IdGenerator) {
      this.pool = pool
      this.idGenerator = idGenerator
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
