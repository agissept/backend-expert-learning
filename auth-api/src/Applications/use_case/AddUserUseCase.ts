import UserRepository from '../../Domains/users/UserRepository'
import PasswordHash from '../security/PasswordHash'
import RegisterUser from '../../Domains/users/entities/RegisterUser'

class AddUserUseCase {
    private userRepository: UserRepository;
    private passwordHash: PasswordHash;

    constructor ({ userRepository, passwordHash } : {userRepository: UserRepository, passwordHash: PasswordHash}) {
      this.userRepository = userRepository
      this.passwordHash = passwordHash
    }

    async execute (useCasePayload: any) {
      const registerUser = new RegisterUser(useCasePayload)
      await this.userRepository.verifyAvailableUsername(registerUser.username)
      registerUser.password = await this.passwordHash.hash(registerUser.password)
      return this.userRepository.addUser(registerUser)
    }
}

export default AddUserUseCase
