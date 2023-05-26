import routes from './routes'
import { Server } from '@hapi/hapi'
import UsersHandler from './handler'
import { Container } from 'instances-container'

export default {
  name: 'users',
  register: async (server: Server, { container }: { container: Container }) => {
    const usersHandler = new UsersHandler(container)
    server.route(routes(usersHandler))
  }
}
