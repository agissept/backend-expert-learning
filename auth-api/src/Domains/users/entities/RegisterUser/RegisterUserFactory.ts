import RegisterUser from './RegisterUser'
import UserRepository from '../../UserRepository'

class RegisterUserFactory {
  userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async create (payload: any): Promise<RegisterUser> {
    const registerUser = new RegisterUser(payload)
    if (await this.userRepository.isUsernameUsed(registerUser.username)) {
      throw new Error('REGISTER_USER.USERNAME_IS_TAKEN')
    }
    return registerUser
  }
}

export default RegisterUserFactory
