import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'

class UserLoginFactory {
  login ({ username, password }: UnvalidatedPayload) {
    if (!username || !password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }

    return { username, password }
  }
}

export default UserLoginFactory
