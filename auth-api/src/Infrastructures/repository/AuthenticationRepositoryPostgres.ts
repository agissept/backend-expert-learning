import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository'

class AuthenticationRepositoryPostgres implements AuthenticationRepository {
  addToken (token: string): void {
  }

  checkAvailabilityToken (token: string): boolean {
    return false
  }

  deleteToken (token: string): void {
  }
}

export default AuthenticationRepositoryPostgres
