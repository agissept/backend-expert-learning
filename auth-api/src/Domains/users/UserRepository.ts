import RegisteredUser from './factory/RegisteredUser/RegisteredUser'
import RegisterUserAggregate from './factory/RegisterUser/RegisterUserAggregate'

interface UserRepository {
    getIdByUsername(username: string): Promise<string>
    getPasswordByUsername(username: string): Promise<string>
    addUser(registerUser: RegisterUserAggregate) : Promise<RegisteredUser>
    isUsernameUsed(username: string) : Promise<Boolean>
}

export default UserRepository
