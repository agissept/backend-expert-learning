class RefreshAuthenticationUseCase {
    constructor(param: any) {

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
