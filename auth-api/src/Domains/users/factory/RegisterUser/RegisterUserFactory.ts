import RegisterUserAggregate from './RegisterUserAggregate'
import UserRepository from '../../UserRepository'
import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'
import RegisterUser from '../../model/DomainModel/RegisterUser'

class RegisterUserFactory {
  userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async create (payload: UnvalidatedPayload): Promise<RegisterUser> {
    const registerUserAggregate = new RegisterUserAggregate()
    const registerUser = registerUserAggregate.register(payload)
    if (await this.userRepository.isUsernameUsed(registerUser.username)) {
      throw new Error('REGISTER_USER.USERNAME_IS_TAKEN')
    }
    return registerUser
  }
}

export default RegisterUserFactory
