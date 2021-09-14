import AuthenticationTokenManager from '../security/AuthenticationTokenManager'
import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository'
import UnvalidatedPayload from '../../Commons/interface/UnvalidatedPayload'

class RefreshAuthenticationUseCase {
    private authenticationTokenManager: AuthenticationTokenManager;
    private authenticationRepository: AuthenticationRepository;

    constructor ({ authenticationTokenManager, authenticationRepository }: any) {
      this.authenticationTokenManager = authenticationTokenManager
      this.authenticationRepository = authenticationRepository
    }

    async execute (useCasePayload: UnvalidatedPayload): Promise<void> {
      this.verify(useCasePayload)
      const { refreshToken } = useCasePayload

      await this.authenticationTokenManager.verifyRefreshToken(refreshToken)
      await this.authenticationRepository.checkAvailabilityToken(refreshToken)
      const { username, id } = await this.authenticationTokenManager.decodePayload(refreshToken)

      return this.authenticationTokenManager.createAccessToken({ username, id })
    }

    private verify (payload: UnvalidatedPayload) {
      const { refreshToken } = payload

      if (!refreshToken) {
        throw new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')
      }

      if (typeof refreshToken !== 'string') {
        throw new Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
      }
    }
}

export default RefreshAuthenticationUseCase
