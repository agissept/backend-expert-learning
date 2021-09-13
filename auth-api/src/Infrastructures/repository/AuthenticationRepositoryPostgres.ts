import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository'
import { Pool } from 'pg'
import InvariantError from '../../Commons/exceptions/InvariantError'

class AuthenticationRepositoryPostgres implements AuthenticationRepository {
  private pool: Pool

  constructor (pool: Pool) {
    this.pool = pool
  }

  async addToken (token: string): Promise<void> {
    const query = {
      text: 'INSERT INTO authentications VALUES($1) RETURNING token',
      values: [token]
    }
    const result = await this.pool.query(query)

    if (!result.rows) {
      throw new Error('token gagal ditambahkan')
    }
  }

  async checkAvailabilityToken (token: string): Promise<void> {
    const query = {
      text: 'SELECT * FROM authentications WHERE token = $1',
      values: [token]
    }
    const result = await this.pool.query(query)

    if (result.rows.length === 0) {
      throw new InvariantError('refresh token tidak ditemukan di database')
    }
  }

  deleteToken (token: string): void {
  }
}

export default AuthenticationRepositoryPostgres
