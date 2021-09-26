import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper'
import pool from '../../database/postgres/pool'
import UserRepositoryPostgres from '../UserRepositoryPostgres'
import RegisterUser from '../../../Domains/users/factory/RegisterUser/RegisterUser'
import RegisteredUser from '../../../Domains/users/factory/RegisteredUser/RegisteredUser'
import InvariantError from '../../../Commons/exceptions/InvariantError'

describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('verifyAvailableUsername function', () => {
    it('should return true when username not available', async () => {
      await UsersTableTestHelper.addUser({ username: 'dicoding' })
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

      await expect(userRepositoryPostgres.isUsernameUsed('dicoding')).resolves.toEqual(true)
    })

    it('should return false when username not available', async () => {
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

      await expect(userRepositoryPostgres.isUsernameUsed('dicoding')).resolves.toEqual(false)
    })
  })

  describe('addUser function', () => {
    it('should persist register user', async () => {
      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_passoword',
        fullname: 'Dicoding Indonesia'
      })

      const fakeIdGenerator = () => '123'
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator)

      await userRepositoryPostgres.addUser(registerUser)

      const users = await UsersTableTestHelper.findUsersById('user-123')
      expect(users).toHaveLength(1)
    })

    it('should return registered user correctly', async () => {
      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_passoword',
        fullname: 'Dicoding Indonesia'
      })

      const fakeIdGenerator = () => '123'
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator)

      const registeredUser = await userRepositoryPostgres.addUser(registerUser)

      expect(registeredUser).toStrictEqual(new RegisteredUser({
        id: 'user-123',
        username: 'dicoding',
        fullname: 'Dicoding Indonesia'
      }))
    })
  })

  describe('getPasswordByUsername', () => {
    it('should throw InvariantError when user not found', () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

      // Action & Assert
      return expect(userRepositoryPostgres.getPasswordByUsername('dicoding'))
        .rejects
        .toThrowError(InvariantError)
    })

    it('should return username password when user is found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})
      await UsersTableTestHelper.addUser({
        username: 'dicoding',
        password: 'secret_password'
      })

      // Action & Assert
      const password = await userRepositoryPostgres.getPasswordByUsername('dicoding')
      expect(password).toBe('secret_password')
    })
  })

  describe('getIdByUsername', () => {
    it('should throw InvariantError when user not found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

      // Action & Assert
      await expect(userRepositoryPostgres.getIdByUsername('dicoding'))
        .rejects
        .toThrowError(InvariantError)
    })

    it('should return user id correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-321', username: 'dicoding' })
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

      // Action
      const userId = await userRepositoryPostgres.getIdByUsername('dicoding')

      // Assert
      expect(userId).toEqual('user-321')
    })
  })
})
