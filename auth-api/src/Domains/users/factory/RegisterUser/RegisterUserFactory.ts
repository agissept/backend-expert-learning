import RegisterUserAggregate from './RegisterUserAggregate'
import UserRepository from '../../UserRepository'
import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'

class RegisterUserFactory {
  userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async create (payload: UnvalidatedPayload): Promise<RegisterUserAggregate> {
    const registerUser = new RegisterUserAggregate(payload)
    if (await this.userRepository.isUsernameUsed(registerUser.username)) {
      throw new Error('REGISTER_USER.USERNAME_IS_TAKEN')
    }
    return registerUser
  }
}

export default RegisterUserFactory
