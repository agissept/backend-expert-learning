import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'

class RegisteredUser {
    id: string
    username: string
    fullname: string

    constructor ({ id, fullname, username }: UnvalidatedPayload) {
      this.id = id
      this.username = username
      this.fullname = fullname
    }
}

export default RegisteredUser
