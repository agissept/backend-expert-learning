import AuthenticationTokenManager from '../../Applications/security/AuthenticationTokenManager'
import InvariantError from '../../Commons/exceptions/InvariantError'

class JwtTokenManager implements AuthenticationTokenManager {
    private jwt;
    constructor (jwt: any) {
      this.jwt = jwt
    }

    async createAccessToken (payload: any) {
      return this.jwt.generate(payload, process.env.ACCESS_TOKEN_KEY)
    }

    async createRefreshToken (payload: any) {
      return this.jwt.generate(payload, process.env.REFRESH_TOKEN_KEY)
    }

    decodePayload (payload: any): any {
      const artifacts = this.jwt.decode(payload)
      return artifacts.decoded.payload
    }

    verifyRefreshToken (token: string): void {
      try {
        const artifacts = this.jwt.decode(token)
        this.jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY)
      } catch (error) {
        throw new InvariantError('refresh token tidak valid')
      }
    }
}

export default JwtTokenManager
