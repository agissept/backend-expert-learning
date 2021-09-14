import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository'
import AuthenticationTokenManager from '../../Applications/security/AuthenticationTokenManager'
import PasswordHash from '../../Applications/security/PasswordHash'
import UserRepository from '../../Domains/users/UserRepository'

interface UseCaseConstructor {
    authenticationRepository: AuthenticationRepository
    authenticationTokenManager: AuthenticationTokenManager
    passwordHash: PasswordHash
    userRepository: UserRepository
}
export default UseCaseConstructor
