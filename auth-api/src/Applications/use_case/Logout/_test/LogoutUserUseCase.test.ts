import LogoutUserUseCase from '../LogoutUserUseCase'
import AuthenticationRepository from '../../../../Domains/authentications/AuthenticationRepository'

describe('LogoutUserUseCase', () => {
  it('should orchestrating the delete authentication action correctly', async () => {
    const useCasePayload = {
      refreshToken: 'refreshToken'
    }

    const mockAuthenticationRepository = <AuthenticationRepository>{}
    mockAuthenticationRepository.checkAvailabilityToken = jest.fn().mockImplementation(() => Promise.resolve())
    mockAuthenticationRepository.deleteToken = jest.fn().mockImplementation(() => Promise.resolve())

    const logoutUserUseCase = new LogoutUserUseCase({ authenticationRepository: mockAuthenticationRepository })
    await logoutUserUseCase.execute(useCasePayload)

    expect(mockAuthenticationRepository.checkAvailabilityToken).toBeCalledWith(useCasePayload.refreshToken)
    expect(mockAuthenticationRepository.deleteToken).toBeCalledWith(useCasePayload.refreshToken)
  })
})
