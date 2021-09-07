import routes from './routes'
import { Server } from '@hapi/hapi'
import UsersHandler from './handler'

export default {
  name: 'users',
  register: async (server: Server, { container }: any) => {
    const usersHandler = new UsersHandler(container)
    server.route(routes(usersHandler))
  }
}
