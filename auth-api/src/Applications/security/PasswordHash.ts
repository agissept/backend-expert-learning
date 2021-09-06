interface PasswordHash {
     hash(password: string): Promise<string>
}

export default PasswordHash
