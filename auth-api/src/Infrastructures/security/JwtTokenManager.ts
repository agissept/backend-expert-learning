import AuthenticationTokenManager from "../../Applications/security/AuthenticationTokenManager";
import InvariantError from "../../Commons/exceptions/InvariantError";

class JwtTokenManager implements AuthenticationTokenManager{
    private jwt;
    constructor(jwt: any) {
        this.jwt = jwt;
    }
    async createAccessToken(payload: any) {
        return this.jwt.generate(payload, process.env.ACCESS_TOKEN_KEY);
    }

    async createRefreshToken(payload: any) {
        return this.jwt.generate(payload, process.env.REFRESH_TOKEN_KEY);
    }

    decodePayload(payload: any): any {
    }

    verifyRefreshToken(token: string): void {
    }

}

export default JwtTokenManager
