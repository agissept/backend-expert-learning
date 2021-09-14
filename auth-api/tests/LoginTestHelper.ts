/* istanbul ignore file */

import UsersTableTestHelper from './UsersTableTestHelper'
import AuthenticationsTableTestHelper from './AuthenticationsTableTestHelper'
import JwtTokenManager from '../src/Infrastructures/security/JwtTokenManager'
import hapiAuthJwt from '@hapi/jwt'

const LoginTestHelper = {
  async getUserAccessToken (id = '123') {
    const username = 'test-user'
    await UsersTableTestHelper.addUser({ id })

    const authenticationTokenManager = new JwtTokenManager(hapiAuthJwt.token)
    const accessToken = await authenticationTokenManager.createAccessToken({ username, id })
    const refreshToken = await authenticationTokenManager.createRefreshToken({ username, id })

    await AuthenticationsTableTestHelper.addToken(refreshToken)

    return accessToken
  }
}
export default LoginTestHelper
