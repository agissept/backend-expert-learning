import { Pool } from 'pg'
import AuthenticationRepositoryPostgres from '../AuthenticationRepositoryPostgres'
import pool from '../../database/postgres/pool'

describe('AuthenticationRepositoryPostgres', () => {
  it('should throw error when add token is failed', () => {
    const token = '123'
    const pool = <Pool>{}

    const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool)
    pool.query = jest.fn().mockImplementation(() => Promise.reject)

    expect(authenticationRepositoryPostgres.addToken(token)).rejects.toThrowError('token gagal ditambahkan')
  })

  it('should throw error when delete token is failed', () => {
    const token = '123'

    const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool)

    expect(authenticationRepositoryPostgres.deleteToken(token)).rejects.toThrowError('refresh token tidak ditemukan di database')
  })
})
