import AuthenticationRepository from '../../../Domains/authentications/AuthenticationRepository'
import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'
import UserLogoutFactory from '../../../Domains/users/factory/UserLogout/UserLogoutFactory'

class LogoutUserUseCase {
  private readonly authenticationRepository: AuthenticationRepository

  constructor ({ authenticationRepository }: UseCaseConstructor) {
    this.authenticationRepository = authenticationRepository
  }

  async execute (payload: UnvalidatedPayload): Promise<void> {
    const userLogoutFactory = new UserLogoutFactory(this.authenticationRepository)
    const refreshToken = await userLogoutFactory.create(payload)
    await this.authenticationRepository.deleteToken(refreshToken)
  }
}
export default LogoutUserUseCase
