import { Server } from '@hapi/hapi'
import routes from './routes'
import AuthenticationsHandler from './handler'
import { Container } from 'instances-container'

export default {
  name: 'authentications',
  register: async (server: Server, { container }: { container: Container }) => {
    const authenticationsHandler = new AuthenticationsHandler(container)
    server.route(routes(authenticationsHandler))
  }
}
