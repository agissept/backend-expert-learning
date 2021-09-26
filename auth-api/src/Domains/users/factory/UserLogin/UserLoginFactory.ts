import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'
import AuthenticationTokenManager from '../../../../Applications/security/AuthenticationTokenManager'
import UserRepository from '../../UserRepository'
import PasswordHash from '../../../../Applications/security/PasswordHash'
import NewAuth from '../../../authentications/model/NewAuth'

class UserLoginFactory {
    private userRepository: UserRepository
    private passwordHash: PasswordHash
    private authenticationTokenManager: AuthenticationTokenManager

    constructor (userRepository: UserRepository, authenticationTokenManager: AuthenticationTokenManager, passwordHash: PasswordHash) {
      this.passwordHash = passwordHash
      this.userRepository = userRepository
      this.authenticationTokenManager = authenticationTokenManager
    }

    async login ({ username, password }: UnvalidatedPayload): Promise<NewAuth> {
      if (!username || !password) {
        throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
      }

      if (typeof username !== 'string' || typeof password !== 'string') {
        throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION')
      }

      const encryptedPassword = await this.userRepository.getPasswordByUsername(username)
      await this.passwordHash.comparePassword(password, encryptedPassword)
      const id = await this.userRepository.getIdByUsername(username)

      const accessToken = await this.authenticationTokenManager.createAccessToken({ username, id })
      const refreshToken = await this.authenticationTokenManager.createRefreshToken({ username, id })

      return { accessToken, refreshToken }
    }
}

export default UserLoginFactory
