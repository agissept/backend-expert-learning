import RefreshAuthenticationUseCase from '../RefreshAuthenticationUseCase'
import AuthenticationRepository from '../../../../Domains/authentications/AuthenticationRepository'
import AuthenticationTokenManager from '../../../security/AuthenticationTokenManager'

describe('RefreshAuthenticationUseCase', () => {
  it('should orchestrating the refresh authentication action correctly', async () => {
    const useCasePayload = {
      refreshToken: 'some_refresh_token'
    }

    const mockAuthenticationRepository = <AuthenticationRepository>{}
    const mockAuthenticationTokenManager = <AuthenticationTokenManager>{}

    mockAuthenticationRepository.checkAvailabilityToken = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockAuthenticationTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'dicoding', id: 'user-123' }))
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('some_new_access_token'))

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager
    })

    const accessToken = await refreshAuthenticationUseCase.execute(useCasePayload)

    expect(mockAuthenticationTokenManager.verifyRefreshToken).toBeCalledWith(useCasePayload.refreshToken)
    expect(mockAuthenticationRepository.checkAvailabilityToken).toBeCalledWith(useCasePayload.refreshToken)
    expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(useCasePayload.refreshToken)
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username: 'dicoding', id: 'user-123' })
    expect(accessToken).toEqual('some_new_access_token')
  })
})
