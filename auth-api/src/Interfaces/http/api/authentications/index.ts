import { Server } from '@hapi/hapi'
import routes from './routes'
import AuthenticationsHandler from './handler'

export default {
  name: 'authentications',
  register: async (server: Server, { container } : any) => {
    const authenticationsHandler = new AuthenticationsHandler(container)
    server.route(routes(authenticationsHandler))
  }
}
