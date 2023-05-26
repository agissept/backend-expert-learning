import UserLogoutFactory from '../UserLogoutFactory'
import AuthenticationRepository from '../../../../authentications/AuthenticationRepository'

describe('UserLogoutFactory', () => {
  const mockAuthenticationRepository = <AuthenticationRepository>{}
  const userLogoutFactory = new UserLogoutFactory(mockAuthenticationRepository)

  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const useCasePayload = {}

    // Action & Assert
    await expect(userLogoutFactory.create(useCasePayload))
      .rejects
      .toThrowError('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')
  })

  it('should throw error if refresh token not string', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 123
    }

    // Action & Assert
    await expect(userLogoutFactory.create(useCasePayload)).rejects.toThrowError('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
  })
})
