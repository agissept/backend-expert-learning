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

      const { rows } = await this.pool.query(query)
      if (!rows.length) {
        throw new Error('data gagal ditambahkan')
      }

      return new AddedThread(rows[0].id, newThread)
    }
}

export default ThreadRepositoryPostgres
