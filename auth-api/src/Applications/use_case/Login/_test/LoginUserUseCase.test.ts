import UserRepository from '../../../../Domains/users/UserRepository'
import AuthenticationTokenManager from '../../../security/AuthenticationTokenManager'
import PasswordHash from '../../../security/PasswordHash'
import LoginUserUseCase from '../LoginUserUseCase'
import AuthenticationRepository from '../../../../Domains/authentications/AuthenticationRepository'

describe('GetAuthenticationUseCase', () => {
  it('should orchestrating the get authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret'
    }
    const mockUserRepository = <UserRepository>{}
    const mockAuthenticationRepository = <AuthenticationRepository>{}
    const mockAuthenticationTokenManager = <AuthenticationTokenManager>{}
    const mockPasswordHash = <PasswordHash>{}
    const expectedAuthentication = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token'
    }

    // Mocking
    mockUserRepository.getPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'))
    mockPasswordHash.comparePassword = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.accessToken))
    mockAuthenticationTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.refreshToken))
    mockUserRepository.getIdByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('user-123'))
    mockAuthenticationRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve())

    // create use case instance
    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash
    })

    // Action
    const actualAuthentication = await loginUserUseCase.execute(useCasePayload)

    // Assert
    expect(actualAuthentication).toEqual(expectedAuthentication)
    expect(mockUserRepository.getPasswordByUsername)
      .toBeCalledWith('dicoding')
    expect(mockPasswordHash.comparePassword)
      .toBeCalledWith('secret', 'encrypted_password')
    expect(mockUserRepository.getIdByUsername)
      .toBeCalledWith('dicoding')
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username: 'dicoding', id: 'user-123' })
    expect(mockAuthenticationTokenManager.createRefreshToken)
      .toBeCalledWith({ username: 'dicoding', id: 'user-123' })
    expect(mockAuthenticationRepository.addToken)
      .toBeCalledWith(expectedAuthentication.refreshToken)
  })
})
