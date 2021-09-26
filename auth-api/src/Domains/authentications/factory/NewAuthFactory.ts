import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import NewAuth from '../model/NewAuth'

class NewAuthFactory {
  create (payload: UnvalidatedPayload) : NewAuth {
    const { accessToken, refreshToken } = payload

    if (!accessToken || !refreshToken) {
      throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
      throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }

    return {
      accessToken,
      refreshToken
    }
  };
}

export default NewAuthFactory
