import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'
import RegisterUser from '../../model/DomainModel/RegisterUser'

class RegisterUserAggregate {
  register ({ username, password, fullname }: UnvalidatedPayload): RegisterUser {
    if (!username || !password || !fullname) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof username !== 'string' || typeof password !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }

    if (username.length > 50) {
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR')
    }

    if (!username.match(/^[\w]+$/)) {
      throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')
    }

    return { username, password, fullname }
  }
}

export default RegisterUserAggregate
