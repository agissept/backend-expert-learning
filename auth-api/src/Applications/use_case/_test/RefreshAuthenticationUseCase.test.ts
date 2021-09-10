import RefreshAuthenticationUseCase from "../RefreshAuthenticationUseCase";


describe('RefreshAuthenticationUseCase', () => {
    it('should throw error if use case payload not containing refresh token', async () => {
        const useCasePayload = {};
        const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({})

        await expect(refreshAuthenticationUseCase.execute(useCasePayload))
            .rejects
            .toThrowError('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')
    });

    it('should throw error if refresh token not string', async ()=> {
        const useCasePayload = {
            refreshToken: 1
        }

        const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({})
        await expect(refreshAuthenticationUseCase.execute(useCasePayload))
            .rejects
            .toThrowError('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
})
