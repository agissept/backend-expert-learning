import PasswordHash from '../../Applications/security/PasswordHash'

class BcryptPasswordHash implements PasswordHash {
    private bcrypt: any;
    private readonly saltRound: number;

    constructor (bcrypt: any, saltRound = 10) {
      this.bcrypt = bcrypt
      this.saltRound = saltRound
    }

    async hash (password: string): Promise<string> {
      return this.bcrypt.hash(password, this.saltRound)
    }
}

export default BcryptPasswordHash
