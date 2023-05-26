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

  async createThread (userId: string, { threadId = 'thread-123', title = 'sebuah judul', body = 'sebuah thread' }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING threads',
      values: [threadId, userId, title, body]
    }

    await pool.query(query)
  },

  async cleanTable () {
    await pool.query('TRUNCATE TABLE threads CASCADE')
  }
}

export default ThreadTableTestHelper
