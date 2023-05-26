import UserLoginFactory from '../UserLoginFactory'
import UserRepository from '../../../UserRepository'
import AuthenticationTokenManager from '../../../../../Applications/security/AuthenticationTokenManager'
import PasswordHash from '../../../../../Applications/security/PasswordHash'

describe('UserLoginFactory factory', () => {
  const userRepository = <UserRepository>{}
  const authenticationTokenManager = <AuthenticationTokenManager>{}
  const passwordHash = <PasswordHash>{}
  const userLoginFactory = new UserLoginFactory(userRepository, authenticationTokenManager, passwordHash)

  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'dicoding'
    }

    // Action & Assert
    expect(() => userLoginFactory.login(payload)).rejects.toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      password: 12345
    }

    // Action & Assert
    expect(() => userLoginFactory.login(payload)).rejects.toThrowError('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })
})
