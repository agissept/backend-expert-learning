interface AuthenticationRepository {
    addToken(token: string) : void
    checkAvailabilityToken(token: string): void
    deleteToken(token: string): void
}
export default AuthenticationRepository
