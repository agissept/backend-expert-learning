interface PasswordHash {
     comparePassword(password: string, encryptedPassword: string): void;
     hash(password: string): Promise<string>
}

export default PasswordHash
