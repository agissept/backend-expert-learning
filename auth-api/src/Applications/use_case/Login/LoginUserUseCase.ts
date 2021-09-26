import UserRepository from '../../../Domains/users/UserRepository'
import AuthenticationTokenManager from '../../security/AuthenticationTokenManager'
import PasswordHash from '../../security/PasswordHash'
import UserLogin from '../../../Domains/users/factory/UserLogin/UserLogin'
import NewAuthFactory from '../../../Domains/authentications/factory/NewAuthFactory'
import AuthenticationRepository from '../../../Domains/authentications/AuthenticationRepository'
import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'

class LoginUserUseCase {
    userRepository: UserRepository;
    authenticationTokenManager: AuthenticationTokenManager;
    authenticationRepository: AuthenticationRepository;
    passwordHash: PasswordHash;

    constructor ({
      userRepository,
      authenticationRepository,
      authenticationTokenManager,
      passwordHash
    }: UseCaseConstructor) {
      this.userRepository = userRepository
      this.authenticationRepository = authenticationRepository
      this.authenticationTokenManager = authenticationTokenManager
      this.passwordHash = passwordHash
    }

    async execute (useCasePayload: UnvalidatedPayload) {
      const { username, password } = new UserLogin(useCasePayload)

      const encryptedPassword = await this.userRepository.getPasswordByUsername(username)
      await this.passwordHash.comparePassword(password, encryptedPassword)
      const id = await this.userRepository.getIdByUsername(username)

      const accessToken = await this.authenticationTokenManager.createAccessToken({ username, id })
      const refreshToken = await this.authenticationTokenManager.createRefreshToken({ username, id })

      const newAuthFactory = new NewAuthFactory()
      const newAuth = newAuthFactory.create({ accessToken, refreshToken })

      await this.authenticationRepository.addToken(newAuth.refreshToken)

      return newAuth
    }
}

export default LoginUserUseCase
