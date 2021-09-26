import DecodedPayload from '../../Domains/authentications/model/DecodedPayload'

interface AuthenticationTokenManager {
    decodePayload(payload: string) : DecodedPayload

    verifyRefreshToken(token: string): void

    createAccessToken(payload: DecodedPayload): Promise<string>;

    createRefreshToken(payload: DecodedPayload): Promise<string>
}

export default AuthenticationTokenManager
