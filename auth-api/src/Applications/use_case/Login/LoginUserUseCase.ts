import UserRepository from '../../../Domains/users/UserRepository'
import AuthenticationTokenManager from '../../security/AuthenticationTokenManager'
import PasswordHash from '../../security/PasswordHash'
import UserLoginFactory from '../../../Domains/users/factory/UserLogin/UserLoginFactory'
import AuthenticationRepository from '../../../Domains/authentications/AuthenticationRepository'
import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'
import NewAuth from '../../../Domains/authentications/model/NewAuth'

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

    async execute (useCasePayload: UnvalidatedPayload): Promise<NewAuth> {
      const userLoginFactory = new UserLoginFactory()
      const { username, password } = userLoginFactory.login(useCasePayload)

      const encryptedPassword = await this.userRepository.getPasswordByUsername(username)
      await this.passwordHash.comparePassword(password, encryptedPassword)
      const id = await this.userRepository.getIdByUsername(username)

      const accessToken = await this.authenticationTokenManager.createAccessToken({ username, id })
      const refreshToken = await this.authenticationTokenManager.createRefreshToken({ username, id })

      await this.authenticationRepository.addToken(refreshToken)

      return { accessToken, refreshToken }
    }
}

export default LoginUserUseCase
