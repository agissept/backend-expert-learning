interface AuthenticationTokenManager {
    decodePayload(payload: any) : any

    verifyRefreshToken(token: string): void

    createAccessToken(payload: { id: string; username: string }): string;

    createRefreshToken(p: { id: string; username: string }): string
}

export default AuthenticationTokenManager
