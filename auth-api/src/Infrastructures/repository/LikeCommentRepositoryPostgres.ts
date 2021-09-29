import LikeCommentRepository from '../../Domains/likes/LikeCommentRepository'
import LikeComment from '../../Domains/likes/model/LikeComment'
import { Pool } from 'pg'
import LikedCommentsCount from '../../Domains/likes/model/LikedCommentsCount'

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

    async getLikeCountCommentsByCommentIds (commentIds: string[]): Promise<LikedCommentsCount[]> {
      const query = {
        text: `SELECT comment_id, count(user_id) AS like_count
               FROM like_comments 
               WHERE comment_id = ANY($1::text[])
               GROUP BY comment_id`,
        values: [commentIds]
      }

      const { rows } = await this.pool.query(query)

      return rows.map((row) => ({
        commentId: row.comment_id,
        likeCount: parseInt(row.like_count)
      }))
    }
}

export default LikeCommentRepositoryPostgres
