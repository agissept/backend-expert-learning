import UserRepository from '../Domains/users/UserRepository'
import PasswordHash from '../Applications/security/PasswordHash'

interface Interfaces{
    UserRepository: UserRepository,
    PasswordHash: PasswordHash
}

export default Interfaces
