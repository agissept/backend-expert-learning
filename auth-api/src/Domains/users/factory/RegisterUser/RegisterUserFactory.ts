import RegisterUserAggregate from './RegisterUserAggregate'
import UserRepository from '../../UserRepository'
import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'
import RegisterUser from '../../model/DomainModel/RegisterUser'
import PasswordHash from '../../../../Applications/security/PasswordHash'

class RegisterUserFactory {
  private userRepository: UserRepository
  private passwordHash: PasswordHash;

  constructor (userRepository: UserRepository, passwordHash: PasswordHash) {
    this.userRepository = userRepository
    this.passwordHash = passwordHash
  }

  async create (payload: UnvalidatedPayload): Promise<RegisterUser> {
    const registerUserAggregate = new RegisterUserAggregate()
    const registerUser = registerUserAggregate.register(payload)
    if (await this.userRepository.isUsernameUsed(registerUser.username)) {
      throw new Error('REGISTER_USER.USERNAME_IS_TAKEN')
    }
    registerUser.password = await this.passwordHash.hash(registerUser.password)
    return registerUser
  }
}

export default RegisterUserFactory
