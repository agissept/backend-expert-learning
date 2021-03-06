import { Pool } from 'pg'
import IdGenerator from '../util/IdGenerator/IdGenerator'
import ReplyRepository from '../../Domains/replies/ReplyRepository'
import NewReply from '../../Domains/replies/model/NewReply'
import ReplyDTO from '../../Domains/replies/model/ReplyDTO'

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

    async getRepliesByCommentIds (commentIds: string[]): Promise<ReplyDTO[]> {
      const query = {
        text: `SELECT replies.*, users.username
            FROM replies 
            INNER JOIN users ON users.id = replies.user_id
            WHERE replies.comment_id = ANY($1::text[])
            ORDER BY replies.created_at ASC`,
        values: [commentIds]
      }

      const { rows } = await this.pool.query(query)
      return rows.map(row => ({
        id: row.id,
        userId: row.user_id,
        commentId: row.comment_id,
        content: row.content,
        isDeleted: row.is_deleted,
        createdAt: row.created_at,
        username: row.username
      }))
    }

    async getReplyById (replyId: string): Promise<ReplyDTO | undefined> {
      const query = {
        text: `SELECT replies.*, users.username
               FROM replies
               JOIN users ON users.id = replies.user_id 
               WHERE replies.id = $1`,
        values: [replyId]
      }
      const { rows, rowCount } = await this.pool.query(query)
      const reply = rows[0]

      if (!rowCount) {
        return undefined
      }
      return {
        commentId: reply.comment_id,
        content: reply.content,
        createdAt: reply.created_at,
        id: reply.id,
        isDeleted: reply.is_deleted,
        userId: reply.user_id,
        username: reply.username
      }
    }

    async softDeleteReply (replyId: string): Promise<void> {
      const query = {
        text: `UPDATE replies
               SET is_deleted = true
               WHERE id = $1`,
        values: [replyId]
      }
      await this.pool.query(query)
    }
}

export default ReplyRepositoryPostgres
