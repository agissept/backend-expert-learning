interface AuthenticationTokenManager {
    decodePayload(payload: any) : any

    verifyRefreshToken(token: string): void

    createAccessToken(payload: { id: string; username: string }): void;

    createRefreshToken(p: { id: string; username: string }): void
}

export default AuthenticationTokenManager
