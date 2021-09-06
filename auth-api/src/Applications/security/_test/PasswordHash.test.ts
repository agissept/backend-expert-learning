import PasswordHash from "../PasswordHash";

describe('PasswordHash interface',  () => {
    it('should throw error when invoke abstract behaviour',  async () => {
        const passwordHashed = new PasswordHash()

        await expect(passwordHashed.hash('dummy_password')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED')
    });
});
