import UserRepository from '../../../Domains/users/UserRepository'
import PasswordHash from '../../security/PasswordHash'
import RegisterUserFactory from '../../../Domains/users/entities/RegisterUser/RegisterUserFactory'
import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'

class AddUserUseCase {
    private readonly userRepository: UserRepository;
    private passwordHash: PasswordHash;

    constructor ({ userRepository, passwordHash } : UseCaseConstructor) {
      this.userRepository = userRepository
      this.passwordHash = passwordHash
    }

    async execute (useCasePayload: UnvalidatedPayload) {
      const factory = new RegisterUserFactory(this.userRepository)
      const registerUser = await factory.create(useCasePayload)
      await this.userRepository.isUsernameUsed(registerUser.username)
      registerUser.password = await this.passwordHash.hash(registerUser.password)
      return this.userRepository.addUser(registerUser)
    }
}

export default AddUserUseCase
