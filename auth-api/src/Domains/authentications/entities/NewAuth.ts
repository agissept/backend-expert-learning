class NewAuth {
    accessToken: string;
    refreshToken: string;

    constructor(payload: any) {
        this.verifyPayload(payload);

        this.accessToken = payload.accessToken;
        this.refreshToken = payload.refreshToken;
    }

     verifyPayload (payload: any) {
        const {accessToken, refreshToken} = payload;

        if (!accessToken || !refreshToken) {
            throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
            throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    };
}


export default NewAuth
