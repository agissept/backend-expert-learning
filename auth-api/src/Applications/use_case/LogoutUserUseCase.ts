class LogoutUserUseCase {
  constructor (payload: any) {

  }

  async execute (payload: any): Promise<void> {
    this.verify(payload)
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
