interface AuthenticationTokenManager {
    decodePayload(payload: any) : any

    verifyRefreshToken(token: string): void

    createAccessToken(payload: { id: string; username: string }): Promise<string>;

    createRefreshToken(p: { id: string; username: string }): Promise<string>
}

export default AuthenticationTokenManager
