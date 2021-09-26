import RegisteredUser from '../../../../Domains/users/entities/RegisteredUser/RegisteredUser'
import PasswordHash from '../../../security/PasswordHash'
import AddUserUseCase from '../AddUserUseCase'
import RegisterUser from '../../../../Domains/users/entities/RegisterUser/RegisterUser'
import UserRepository from '../../../../Domains/users/UserRepository'

describe('AddUserUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
      fullname: 'Dicoding Indonesia'
    }

    const expectedRegisteredUser = new RegisteredUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname
    })

    const mockUserRepository = <UserRepository>{}
    const mockPasswordHash = <PasswordHash>{}

    mockUserRepository.isUsernameUsed = jest.fn().mockImplementation(() => Promise.resolve())
    mockPasswordHash.hash = jest.fn().mockImplementation(() => Promise.resolve('encrypted_password'))
    mockUserRepository.addUser = jest.fn().mockImplementation(() => Promise.resolve(expectedRegisteredUser))

    const getUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash
    })

    const registerUser = await getUserUseCase.execute(useCasePayload)

    expect(registerUser).toStrictEqual(expectedRegisteredUser)
    expect(mockUserRepository.isUsernameUsed).toBeCalledWith(useCasePayload.username)
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password)
    expect(mockUserRepository.addUser).toBeCalledWith(new RegisterUser({
      username: useCasePayload.username,
      password: 'encrypted_password',
      fullname: useCasePayload.fullname
    }))
  })
})