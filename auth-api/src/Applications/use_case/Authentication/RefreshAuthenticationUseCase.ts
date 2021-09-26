import AuthenticationTokenManager from '../../security/AuthenticationTokenManager'
import AuthenticationRepository from '../../../Domains/authentications/AuthenticationRepository'
import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'
import RefreshAuthFactory from '../../../Domains/authentications/factory/RefreshAuth/RefreshAuthFactory'

class RefreshAuthenticationUseCase {
    private readonly authenticationTokenManager: AuthenticationTokenManager;
    private readonly authenticationRepository: AuthenticationRepository;

    constructor ({ authenticationTokenManager, authenticationRepository }: UseCaseConstructor) {
      this.authenticationTokenManager = authenticationTokenManager
      this.authenticationRepository = authenticationRepository
    }

    async execute (useCasePayload: UnvalidatedPayload): Promise<string> {
      const refreshAuthFactory = new RefreshAuthFactory(this.authenticationTokenManager, this.authenticationRepository)
      return await refreshAuthFactory.create(useCasePayload)
    }
}

export default RefreshAuthenticationUseCase
