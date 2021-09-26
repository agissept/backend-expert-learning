import { Pool } from 'pg'
import AuthenticationRepositoryPostgres from '../AuthenticationRepositoryPostgres'
import pool from '../../database/postgres/pool'
import AuthenticationsTableTestHelper from '../../../../tests/AuthenticationsTableTestHelper'
import InvariantError from '../../../Commons/exceptions/InvariantError'

describe('AuthenticationRepositoryPostgres', () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('addToken function', () => {
    it('should throw error when add token is failed', () => {
      const token = '123'
      const pool = <Pool>{}

      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool)
      pool.query = jest.fn().mockImplementation(() => Promise.reject)

      expect(authenticationRepositoryPostgres.addToken(token)).rejects.toThrowError('token gagal ditambahkan')
    })

    it('should add token to database', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool)
      const token = 'token'

      // Action
      await authenticationRepository.addToken(token)

      // Assert
      const tokens = await AuthenticationsTableTestHelper.findToken(token)
      expect(tokens).toHaveLength(1)
      expect(tokens[0].token).toBe(token)
    })
  })

  describe('checkAvailabilityToken function', () => {
    it('should throw InvariantError if token not available', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool)
      const token = 'token'

      // Action & Assert
      await expect(authenticationRepository.checkAvailabilityToken(token))
        .rejects.toThrow(InvariantError)
    })

    it('should not throw InvariantError if token available', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool)
      const token = 'token'
      await AuthenticationsTableTestHelper.addToken(token)

      // Action & Assert
      await expect(authenticationRepository.checkAvailabilityToken(token))
        .resolves.not.toThrow(InvariantError)
    })
  })

  describe('deleteToken', () => {
    it('should throw error when delete token is failed', () => {
      const token = '123'

      const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres(pool)

      expect(authenticationRepositoryPostgres.deleteToken(token)).rejects.toThrowError('refresh token tidak ditemukan di database')
    })
    it('should delete token from database', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool)
      const token = 'token'
      await AuthenticationsTableTestHelper.addToken(token)

      // Action
      await authenticationRepository.deleteToken(token)

      // Assert
      const tokens = await AuthenticationsTableTestHelper.findToken(token)
      expect(tokens).toHaveLength(0)
    })
  })
})
