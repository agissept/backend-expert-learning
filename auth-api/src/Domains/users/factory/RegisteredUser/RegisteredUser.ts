import RegisteredUserPayload from '../model/RegisteredUserPayload'

class RegisteredUser {
    id: string
    username: string
    fullname: string

    constructor ({ id, fullname, username }: RegisteredUserPayload) {
      this.id = id
      this.username = username
      this.fullname = fullname
    }
}

export default RegisteredUser
