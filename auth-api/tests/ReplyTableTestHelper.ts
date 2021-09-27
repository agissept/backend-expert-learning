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
  },

  async createReply (userId: string, commentId: string, { replyId = 'reply-123', content = 'sebuah koementar' }) {
    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4) RETURNING id',
      values: [replyId, userId, commentId, content]
    }

    await pool.query(query)
  }
}

export default ReplyTableTestHelper
