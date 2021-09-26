import RegisteredUser from './factory/RegisteredUser/RegisteredUser'
import RegisterUser from './model/DomainModel/RegisterUser'

interface UserRepository {
    getIdByUsername(username: string): Promise<string>
    getPasswordByUsername(username: string): Promise<string>
    addUser(registerUser: RegisterUser) : Promise<RegisteredUser>
    isUsernameUsed(username: string) : Promise<Boolean>
}

export default UserRepository
