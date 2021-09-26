import RegisterUser from './model/DomainModel/RegisterUser'
import RegisteredUser from './model/DomainModel/RegisteredUser'

interface UserRepository {
    getIdByUsername(username: string): Promise<string>
    getPasswordByUsername(username: string): Promise<string>
    addUser(registerUser: RegisterUser) : Promise<RegisteredUser>
    isUsernameUsed(username: string) : Promise<Boolean>
}

export default UserRepository
