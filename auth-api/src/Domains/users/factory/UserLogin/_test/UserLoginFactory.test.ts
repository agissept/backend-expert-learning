import UserLoginFactory from '../UserLoginFactory'

describe('UserLoginFactory factory', () => {
  const userLoginFactory = new UserLoginFactory()
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'dicoding'
    }

    // Action & Assert
    expect(() => userLoginFactory.login(payload)).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      password: 12345
    }

    // Action & Assert
    expect(() => userLoginFactory.login(payload)).toThrowError('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create UserLoginFactory factory correctly', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      password: '12345'
    }

    // Action
    const userLogin = userLoginFactory.login(payload)

    // Assert
    expect(userLogin.username).toEqual(payload.username)
    expect(userLogin.password).toEqual(payload.password)
  })
})
