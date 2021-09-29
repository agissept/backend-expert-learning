import pool from '../src/Infrastructures/database/postgres/pool'

const LikeCommentsTableTestHelper = {
  async findLikeComments (userId: string, commentId: string) {
    const query = {
      text: 'SELECT * FROM like_comments WHERE user_id = $1 AND comment_Id = $2',
      values: [userId, commentId]
    }

    const result = await pool.query(query)
    return result.rows
  },
  async cleanTable () {
    await pool.query('TRUNCATE TABLE like_comments CASCADE')
  },
  async likeComment (userId: string, commentId: string) {
    const query = {
      text: 'INSERT INTO like_comments VALUES($1, $2)',
      values: [userId, commentId]
    }

    await pool.query(query)
  }
}
export default LikeCommentsTableTestHelper
