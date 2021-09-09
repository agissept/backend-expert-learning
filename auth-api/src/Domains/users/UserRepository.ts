import RegisteredUser from './entities/RegisteredUser'

interface UserRepository {
    addUser(registerUser: any) : Promise<RegisteredUser>
    isUsernameUsed(username: string) : Promise<Boolean>
}

export default UserRepository
