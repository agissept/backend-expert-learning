class RefreshAuthenticationUseCase{
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
    }
}

export default RefreshAuthenticationUseCase
