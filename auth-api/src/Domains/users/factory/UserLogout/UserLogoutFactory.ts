import AuthenticationRepository from '../../../authentications/AuthenticationRepository'
import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'

class UserLogoutFactory {
  private authenticationRepository: AuthenticationRepository;

  constructor (authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository
  }

  async create ({ refreshToken }: UnvalidatedPayload): Promise<string> {
    if (!refreshToken) {
      throw new Error('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
    }

    await this.authenticationRepository.checkAvailabilityToken(refreshToken)
    return refreshToken
  }
}

export default UserLogoutFactory
