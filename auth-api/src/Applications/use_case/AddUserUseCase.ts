import UserRepository from '../../Domains/users/UserRepository'
import PasswordHash from '../security/PasswordHash'
import RegisterUserFactory from '../../Domains/users/entities/RegisterUser/RegisterUserFactory'

class AddUserUseCase {
    private readonly userRepository: UserRepository;
    private passwordHash: PasswordHash;

    constructor ({ userRepository, passwordHash } : {userRepository: UserRepository, passwordHash: PasswordHash}) {
      this.userRepository = userRepository
      this.passwordHash = passwordHash
    }

    async execute (useCasePayload: any) {
      const factory = new RegisterUserFactory(this.userRepository)
      const registerUser = await factory.create(useCasePayload)
      await this.userRepository.isUsernameUsed(registerUser.username)
      registerUser.password = await this.passwordHash.hash(registerUser.password)
      return this.userRepository.addUser(registerUser)
    }
}

export default AddUserUseCase
