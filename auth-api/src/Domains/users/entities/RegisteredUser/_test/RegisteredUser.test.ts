import RegisteredUser from '../RegisteredUser'

describe('a RegisteredUser factory', () => {
  it('should create registerUser object correctly', () => {
    const payload = {
      id: 'user-123',
      username: 'dicoding',
      fullname: 'Dicoding Indonesia'
    }

    const registerUser = new RegisteredUser(payload)

    expect(registerUser.id).toEqual(payload.id)
    expect(registerUser.username).toEqual(payload.username)
    expect(registerUser.fullname).toEqual(payload.fullname)
  })
})
