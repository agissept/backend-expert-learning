import LikeCommentRepository from '../../Domains/likes/LikeCommentRepository'
import LikeComment from '../../Domains/likes/model/LikeComment'
import { Pool } from 'pg'

class LikeCommentRepositoryPostgres implements LikeCommentRepository {
    private pool: Pool;

    constructor (pool: Pool) {
      this.pool = pool
    }

    async likeComment ({ userId, commentId }: LikeComment): Promise<void> {
      const query = {
        text: 'INSERT INTO like_comments VALUES($1, $2)',
        values: [userId, commentId]
      }

      await this.pool.query(query)
    }

    async isUserHasLikedTheComment ({ userId, commentId }: LikeComment): Promise<boolean> {
      const query = {
        text: 'SELECT * FROM like_comments WHERE user_id = $1 AND comment_Id = $2',
        values: [userId, commentId]
      }

      const { rowCount } = await this.pool.query(query)
      return !!rowCount
    }

    async unlikeComment ({ userId, commentId }: LikeComment): Promise<void> {
      const query = {
        text: 'DELETE FROM like_comments WHERE user_id = $1 AND comment_Id = $2',
        values: [userId, commentId]
      }

      await this.pool.query(query)
    }
}

export default LikeCommentRepositoryPostgres
