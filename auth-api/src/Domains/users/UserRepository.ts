class UserRepository {
    async addUser(registerUser: any) {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async verifyAvailableUsername(username: string) {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}

export default UserRepository
