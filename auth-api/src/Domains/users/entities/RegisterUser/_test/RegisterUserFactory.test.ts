import RegisterUserFactory from '../RegisterUserFactory'
import UserRepository from '../../../UserRepository'

describe('RegisterUserFactory', () => {
  it('should throw error when register with taken username', async () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
      password: 'abc'
    }
    // Action
    const mockUserRepository = <UserRepository>{}
    mockUserRepository.isUsernameUsed = jest.fn().mockImplementation(() => Promise.resolve(true))

    const factory = new RegisterUserFactory(mockUserRepository)

    // Assert
    await expect(factory.create(payload)).rejects.toThrowError('REGISTER_USER.USERNAME_IS_TAKEN')
  })
})
