import PasswordHash from '../../Applications/security/PasswordHash'
import AuthenticationError from '../../Commons/exceptions/AuthenticationError'

class BcryptPasswordHash implements PasswordHash {
    private bcrypt
    private readonly saltRound: number;

    constructor (bcrypt: any, saltRound = 10) {
      this.bcrypt = bcrypt
      this.saltRound = saltRound
    }

    async hash (password: string): Promise<string> {
      return this.bcrypt.hash(password, this.saltRound)
    }

    async comparePassword (password: string, encryptedPassword: string): Promise<void> {
      const result = await this.bcrypt.compare(password, encryptedPassword)

      if (!result) {
        throw new AuthenticationError('kredensial yang Anda masukkan salah')
      }
    }
}

export default BcryptPasswordHash
