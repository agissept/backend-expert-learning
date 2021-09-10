interface AuthenticationRepository {
    addToken(token: string) : void
    checkAvailabilityToken(token: string): boolean
    deleteToken(token: string): void
}
