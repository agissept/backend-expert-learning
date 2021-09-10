import UserRepository from "../../Domains/users/UserRepository";
import AuthenticationTokenManager from "../security/AuthenticationTokenManager";
import PasswordHash from "../security/PasswordHash";
import UserLogin from "../../Domains/users/entities/UserLogin/UserLogin";
import NewAuth from "../../Domains/authentications/entities/NewAuth";

class LoginUserUseCase {
    userRepository: UserRepository;
    authenticationTokenManager: AuthenticationTokenManager;
    authenticationRepository: AuthenticationRepository;
    passwordHash: PasswordHash;

    constructor({
                    userRepository,
                    authenticationRepository,
                    authenticationTokenManager,
                    passwordHash
                }:
                    {
                        userRepository: UserRepository,
                        authenticationRepository: AuthenticationRepository,
                        authenticationTokenManager: AuthenticationTokenManager,
                        passwordHash: PasswordHash
                    }
    ) {
        this.userRepository = userRepository;
        this.authenticationRepository = authenticationRepository;
        this.authenticationTokenManager = authenticationTokenManager;
        this.passwordHash = passwordHash;
    }

    async execute(useCasePayload: { password: string; username: string }) {
        const {username, password} = new UserLogin(useCasePayload);

        const encryptedPassword = await this.userRepository.getPasswordByUsername(username)
        await this.passwordHash.comparePassword(password, encryptedPassword)
        const id = await this.userRepository.getIdByUsername(username)

        const accessToken = await this.authenticationTokenManager.createAccessToken({username, id})
        const refreshToken = await this.authenticationTokenManager.createRefreshToken({username, id})

        const newAuthentication = new NewAuth({accessToken, refreshToken})

        await this.authenticationRepository.addToken(newAuthentication.refreshToken)

        return newAuthentication
    }

}

export default LoginUserUseCase
