import { Pool } from 'pg'
import UserRepository from '../../Domains/users/UserRepository'
import InvariantError from '../../Commons/exceptions/InvariantError'
import RegisterUser from '../../Domains/users/model/DomainModel/RegisterUser'
import RegisteredUser from '../../Domains/users/model/DomainModel/RegisteredUser'
import IdGenerator from '../util/IdGenerator/IdGenerator'

class UserRepositoryPostgres implements UserRepository {
    private pool: Pool
    private readonly idGenerator: IdGenerator

    constructor (pool: Pool, idGenerator: IdGenerator) {
      this.pool = pool
      this.idGenerator = idGenerator
    }

    async addUser (registerUser: RegisterUser): Promise<RegisteredUser> {
      const { username, password, fullname } = registerUser
      const id = `user-${this.idGenerator.generate()}`

      const query = {
        text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname',
        values: [id, username, password, fullname]
      }

      const result = await this.pool.query(query)

      return { ...result.rows[0] }
    }

    async isUsernameUsed (username: string) {
      const query = {
        text: 'SELECT username FROM users WHERE username = $1',
        values: [username]
      }

      const result = await this.pool.query(query)
      return !!result.rowCount
    }

    async getPasswordByUsername (username: string) {
      const query = {
        text: 'SELECT password FROM users WHERE username = $1',
        values: [username]
      }

      const result = await this.pool.query(query)

      if (!result.rowCount) {
        throw new InvariantError('username tidak ditemukan')
      }

      return result.rows[0].password
    }

    async getIdByUsername (username: string) {
      const query = {
        text: 'SELECT id FROM users WHERE username = $1',
        values: [username]
      }

      const result = await this.pool.query(query)

      if (!result.rowCount) {
        throw new InvariantError('user tidak ditemukan')
      }

      const { id } = result.rows[0]

      return id
    }
}

export default UserRepositoryPostgres
