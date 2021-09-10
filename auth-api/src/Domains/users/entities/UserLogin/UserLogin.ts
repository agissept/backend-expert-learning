class UserLogin {
    username: string;
    password: string;

    constructor ({ username, password }: any) {
      if (!username || !password) {
        throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
      }

      if (typeof username !== 'string' || typeof password !== 'string') {
        throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION')
      }

      this.username = username
      this.password = password
    }
}

export default UserLogin
