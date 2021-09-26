import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'

class NewAuth {
    accessToken: string;
    refreshToken: string;

    constructor (payload: UnvalidatedPayload) {
      this.verifyPayload(payload)

      this.accessToken = payload.accessToken
      this.refreshToken = payload.refreshToken
    }

    private verifyPayload (payload: UnvalidatedPayload) {
      const { accessToken, refreshToken } = payload

      if (!accessToken || !refreshToken) {
        throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY')
      }

      if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
        throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION')
      }
    };
}

export default NewAuth
