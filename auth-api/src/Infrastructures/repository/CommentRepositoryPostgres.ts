import { Pool } from 'pg'
import IdGenerator from '../util/IdGenerator/IdGenerator'
import CommentRepository from '../../Domains/comment/CommentRepository'
import NewComment from '../../Domains/comment/entities/NewComment/NewComment'
import AddedComment from '../../Domains/comment/entities/AddedComment/AddedComment'

class CommentRepositoryPostgres implements CommentRepository {
    private pool: Pool
    private idGenerator: IdGenerator

    constructor (pool: Pool, idGenerator: IdGenerator) {
      this.pool = pool
      this.idGenerator = idGenerator
    }

    async addComment (newComment: NewComment): Promise<AddedComment> {
      const commentId = `comment-${this.idGenerator.generate()}`
      const query = {
        text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id',
        values: [commentId, ...Object.values(newComment)]
      }

      const { rowCount } = await this.pool.query(query)
      if (!rowCount) {
        throw new Error('data gagal ditambahkan')
      }

      return new AddedComment(commentId, newComment)
    }
}

export default CommentRepositoryPostgres