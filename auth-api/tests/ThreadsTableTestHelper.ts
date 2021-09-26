/* istanbul ignore file */
import pool from '../src/Infrastructures/database/postgres/pool'

const ThreadTableTestHelper = {
  async findThreadById (id: string) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id]
    }

    const result = await pool.query(query)
    return result.rows
  },

  async cleanTable () {
    await pool.query('TRUNCATE TABLE threads CASCADE')
  }
}

export default ThreadTableTestHelper
