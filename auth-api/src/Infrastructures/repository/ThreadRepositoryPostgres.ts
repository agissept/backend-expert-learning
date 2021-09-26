import ThreadRepository from '../../Domains/threads/ThreadRepository'
import { Pool } from 'pg'
import IdGenerator from '../util/IdGenerator/IdGenerator'
import ThreadDTO from '../../Domains/threads/model/RepositoryModel/ThreadDTO'
import AddedThread from '../../Domains/threads/model/DomainModel/AddedThread'
import NewThread from '../../Domains/threads/model/DomainModel/NewThread'

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

    async addThread ({ title, body, userId }: NewThread): Promise<AddedThread> {
      const threadId = `thread-${this.idGenerator.generate()}`
      const query = {
        text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING threads',
        values: [threadId, userId, title, body]
      }

      const { rowCount } = await this.pool.query(query)
      if (!rowCount) {
        throw new Error('data gagal ditambahkan')
      }

      return { id: threadId, owner: userId, title: title }
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
