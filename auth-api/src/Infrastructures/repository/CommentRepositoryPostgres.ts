import { Pool } from 'pg'
import IdGenerator from '../util/IdGenerator/IdGenerator'
import CommentRepository from '../../Domains/comment/CommentRepository'
import CommentDTO from '../../Domains/comment/model/RepositoryModel/CommentDTO'
import NewComment from '../../Domains/comment/model/DomainModel/NewComment'

class CommentRepositoryPostgres implements CommentRepository {
    private pool: Pool
    private idGenerator: IdGenerator

    constructor (pool: Pool, idGenerator: IdGenerator) {
      this.pool = pool
      this.idGenerator = idGenerator
    }

    async getCommentsByThreadId (threadId: string): Promise<CommentDTO[]> {
      const query = {
        text: `SELECT comments.*, users.username
               FROM comments
               JOIN users ON users.id = comments.user_id
               WHERE thread_id = $1`,
        values: [threadId]
      }
      const { rows } = await this.pool.query(query)

      return rows.map((comment) => ({
        id: comment.id,
        username: comment.username,
        date: comment.created_at,
        content: comment.content,
        isDeleted: comment.is_deleted
      }))
    }

    async getDetailComment (commentId: string): Promise<CommentDTO> {
      const query = {
        text: 'SELECT * FROM comments WHERE id = $1',
        values: [commentId]
      }
      const { rows, rowCount } = await this.pool.query(query)

      if (!rowCount) {
        return undefined as unknown as CommentDTO
      }

      return {
        userId: rows[0].user_id,
        ...rows[0]
      }
    }

    async softDeleteComment (commentId: string): Promise<void> {
      const query = {
        text: `UPDATE comments
               SET is_deleted = true
               WHERE id = $1 RETURNING id`,
        values: [commentId]
      }
      await this.pool.query(query)
    }

    isCommentAvailableInThread (threadId: string, commentId: string): Promise<Boolean> {
      throw new Error('Method not implemented.')
    }

    async addComment (newComment: NewComment): Promise<string> {
      const commentId = `comment-${this.idGenerator.generate()}`
      const query = {
        text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id',
        values: [commentId, ...Object.values(newComment)]
      }

      const { rowCount } = await this.pool.query(query)
      if (!rowCount) {
        throw new Error('data gagal ditambahkan')
      }

      return commentId
    }
}

export default CommentRepositoryPostgres
