import { Pool } from 'pg'
import RegisterUser from '../../Domains/users/entities/RegisterUser/RegisterUser'
import RegisteredUser from '../../Domains/users/entities/RegisteredUser/RegisteredUser'
import UserRepository from '../../Domains/users/UserRepository'

class UserRepositoryPostgres implements UserRepository {
    private pool: Pool
    private readonly idGenerator: any

    constructor (pool: Pool, idGenerator: any) {
      this.pool = pool
      this.idGenerator = idGenerator
    }

    async addUser (registerUser: RegisterUser): Promise<RegisteredUser> {
      const { username, password, fullname } = registerUser
      const id = `user-${this.idGenerator()}`

      const query = {
        text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname',
        values: [id, username, password, fullname]
      }

      const result = await this.pool.query(query)

      return new RegisteredUser({ ...result.rows[0] })
    }

    async isUsernameUsed (username: string) {
      const query = {
        text: 'SELECT username FROM users WHERE username = $1',
        values: [username]
      }

      const result = await this.pool.query(query)
      return !!result.rowCount
    }
}

export default UserRepositoryPostgres
