import UserRepository from '../../../Domains/users/UserRepository'
import PasswordHash from '../../security/PasswordHash'
import RegisterUserFactory from '../../../Domains/users/factory/RegisterUser/RegisterUserFactory'
import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'

class AddUserUseCase {
    private readonly userRepository: UserRepository;
    private readonly passwordHash: PasswordHash;

    constructor ({ userRepository, passwordHash } : UseCaseConstructor) {
      this.userRepository = userRepository
      this.passwordHash = passwordHash
    }

    async execute (useCasePayload: UnvalidatedPayload) {
      const factory = new RegisterUserFactory(this.userRepository, this.passwordHash)
      const registerUser = await factory.create(useCasePayload)
      return this.userRepository.addUser(registerUser)
    }
}

export default AddUserUseCase
