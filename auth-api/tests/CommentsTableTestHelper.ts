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
  }
}
export default CommentsTableTestHelper
