import RegisteredUser from './entities/RegisteredUser'

interface UserRepository {
    addUser(registerUser: any) : Promise<RegisteredUser>
    verifyAvailableUsername(username: string) : void
}

export default UserRepository
