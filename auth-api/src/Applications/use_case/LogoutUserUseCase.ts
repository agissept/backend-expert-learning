import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository'

class LogoutUserUseCase {
  private readonly authenticationRepository: AuthenticationRepository

  constructor ({ authenticationRepository }: any) {
    this.authenticationRepository = authenticationRepository
  }

  async execute (payload: any): Promise<void> {
    this.verify(payload)
    const { refreshToken } = payload

    await this.authenticationRepository.checkAvailabilityToken(refreshToken)
    await this.authenticationRepository.deleteToken(refreshToken)
  }

  private verify (payload: any) {
    const { refreshToken } = payload

    if (!refreshToken) {
      throw new Error('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}
export default LogoutUserUseCase
