interface AuthenticationTokenManager{
    createAccessToken(payload: { id: string; username: string }): void;

    createRefreshToken(p: { id: string; username: string }): void
}

export default AuthenticationTokenManager
