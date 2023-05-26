import RefreshAuthFactory from '../RefreshAuthFactory'
import AuthenticationRepository from '../../../AuthenticationRepository'
import AuthenticationTokenManager from '../../../../../Applications/security/AuthenticationTokenManager'

describe('RefreshAuthFactory', function () {
  const mockAuthenticationRepository = <AuthenticationRepository>{}
  const mockAuthenticationTokenManager = <AuthenticationTokenManager>{}
  const refreshAuthFactory = new RefreshAuthFactory(mockAuthenticationTokenManager, mockAuthenticationRepository)

  it('should throw error if use case payload not containing refresh token', async () => {
    const useCasePayload = {}

    await expect(refreshAuthFactory.create(useCasePayload))
      .rejects
      .toThrowError('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')
  })

  it('should throw error if refresh token not string', async () => {
    const useCasePayload = {
      refreshToken: 1
    }

    await expect(refreshAuthFactory.create(useCasePayload))
      .rejects
      .toThrowError('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
  })
})
