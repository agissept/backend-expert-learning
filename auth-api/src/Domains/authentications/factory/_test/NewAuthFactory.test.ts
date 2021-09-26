import NewAuthFactory from '../NewAuthFactory'

describe('NewAuth factory', () => {
  const newAuthFactory = new NewAuthFactory()

  it('should throw error when payload not contain needed property', () => {
    const payload = {
      accessToken: 'accessToken'
    }

    expect(() => newAuthFactory.create(payload)).toThrowError('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 1234
    }

    expect(() => newAuthFactory.create(payload)).toThrowError('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create NewAuth factory correctly', () => {
    // Arrange
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    }

    const newAuth = newAuthFactory.create(payload)
    expect(newAuth.accessToken).toEqual(payload.accessToken)
    expect(newAuth.refreshToken).toEqual(payload.refreshToken)
  })
})
