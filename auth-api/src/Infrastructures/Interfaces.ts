import UserRepository from '../Domains/users/UserRepository'
import PasswordHash from '../Applications/security/PasswordHash'
import AuthenticationRepository from "../Domains/authentications/AuthenticationRepository";
import AuthenticationTokenManager from "../Applications/security/AuthenticationTokenManager";

interface Interfaces{
    AuthenticationTokenManager: AuthenticationTokenManager,
    AuthenticationRepository: AuthenticationRepository,
    UserRepository: UserRepository,
    PasswordHash: PasswordHash
}

export default Interfaces
