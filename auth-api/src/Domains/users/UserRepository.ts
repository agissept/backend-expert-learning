import RegisteredUser from './entities/RegisteredUser/RegisteredUser'

interface UserRepository {
    getIdByUsername(username: string): Promise<string>
    getPasswordByUsername(username: string): Promise<string>
    addUser(registerUser: any) : Promise<RegisteredUser>
    isUsernameUsed(username: string) : Promise<Boolean>
}

export default UserRepository
