import { Pool } from 'pg'
import IdGenerator from '../util/IdGenerator/IdGenerator'
import ReplyRepository from '../../Domains/replies/ReplyRepository'
import NewReply from '../../Domains/replies/model/NewReply'

class ReplyRepositoryPostgres implements ReplyRepository {
    private pool: Pool
    private idGenerator: IdGenerator

    constructor (pool: Pool, idGenerator: IdGenerator) {
      this.pool = pool
      this.idGenerator = idGenerator
    }

    async addReply ({ userId, content, commentId }: NewReply): Promise<string> {
      const replyId = `reply-${this.idGenerator.generate()}`
      const query = {
        text: 'INSERT INTO replies VALUES($1, $2, $3, $4) RETURNING id',
        values: [replyId, userId, commentId, content]
      }

      const { rowCount } = await this.pool.query(query)
      if (!rowCount) {
        throw new Error('data gagal ditambahkan')
      }

      return replyId
    }
}

export default ReplyRepositoryPostgres
