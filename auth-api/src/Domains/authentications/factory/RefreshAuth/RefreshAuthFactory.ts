import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'
import AuthenticationTokenManager from '../../../../Applications/security/AuthenticationTokenManager'
import AuthenticationRepository from '../../AuthenticationRepository'

class RefreshAuthFactory {
    private authenticationTokenManager: AuthenticationTokenManager;
    private authenticationRepository: AuthenticationRepository;

    constructor (authenticationTokenManager: AuthenticationTokenManager,
      authenticationRepository: AuthenticationRepository) {
      this.authenticationTokenManager = authenticationTokenManager
      this.authenticationRepository = authenticationRepository
    }

    async create ({ refreshToken }: UnvalidatedPayload) {
      if (!refreshToken) {
        throw new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')
      }

      if (typeof refreshToken !== 'string') {
        throw new Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
      }

      await this.authenticationTokenManager.verifyRefreshToken(refreshToken)
      await this.authenticationRepository.checkAvailabilityToken(refreshToken)
      const { username, id } = await this.authenticationTokenManager.decodePayload(refreshToken)

      return this.authenticationTokenManager.createAccessToken({ username, id })
    }
}

export default RefreshAuthFactory
