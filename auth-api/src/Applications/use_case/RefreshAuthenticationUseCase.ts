import AuthenticationTokenManager from "../security/AuthenticationTokenManager";
import AuthenticationRepository from "../../Domains/authentications/AuthenticationRepository";

class RefreshAuthenticationUseCase {
    private authenticationTokenManager: AuthenticationTokenManager;
    private authenticationRepository: AuthenticationRepository;

    constructor({authenticationTokenManager, authenticationRepository}: any) {
        this.authenticationTokenManager = authenticationTokenManager
        this.authenticationRepository = authenticationRepository
    }


    async execute(useCasePayload: any): Promise<void> {
        this.verify(useCasePayload)
    }

    private verify(payload: any) {
        const {refreshToken} = payload

        if (!refreshToken) {
            throw new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
        }

        if (typeof refreshToken !== 'string') {
            throw new Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

export default RefreshAuthenticationUseCase
