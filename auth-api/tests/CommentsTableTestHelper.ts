/* istanbul ignore file */
import pool from '../src/Infrastructures/database/postgres/pool'

const CommentsTableTestHelper = {
  async findCommentById (id: string) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id]
    }

    const result = await pool.query(query)
    return result.rows
  },

  async cleanTable () {
    await pool.query('TRUNCATE TABLE comments CASCADE')
  },

  async createComment (userId: string, threadId: string, { commentId = 'coment-123', content = 'sebuah koementar' }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id',
      values: [commentId, userId, threadId, content]
    }

    await pool.query(query)
  }
}
export default CommentsTableTestHelper
