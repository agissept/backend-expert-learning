import RegisterUserPayload from './model/RegisterUserPayload'

class RegisterUser {
    username: string
    password: string
    fullname: string

    constructor ({ username, password, fullname }: RegisterUserPayload) {
      if (username.length > 50) {
        throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR')
      }

      if (!username.match(/^[\w]+$/)) {
        throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
      }

      this.username = username
      this.password = password
      this.fullname = fullname
    }
}

export default RegisterUser
