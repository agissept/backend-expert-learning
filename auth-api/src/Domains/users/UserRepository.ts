import RegisteredUser from './entities/RegisteredUser/RegisteredUser'
import RegisterUser from './entities/RegisterUser/RegisterUser'

interface UserRepository {
    getIdByUsername(username: string): Promise<string>
    getPasswordByUsername(username: string): Promise<string>
    addUser(registerUser: RegisterUser) : Promise<RegisteredUser>
    isUsernameUsed(username: string) : Promise<Boolean>
}

export default UserRepository
