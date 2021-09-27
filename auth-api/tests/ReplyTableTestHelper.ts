/* istanbul ignore file */
import pool from '../src/Infrastructures/database/postgres/pool'

const ReplyTableTestHelper = {
  async findReplyById (id: string) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
      values: [id]
    }

    const result = await pool.query(query)
    return result.rows
  },
  async cleanTable () {
    await pool.query('TRUNCATE TABLE replies CASCADE')
  }
}

export default ReplyTableTestHelper
