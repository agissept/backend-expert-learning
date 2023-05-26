import { Server } from '@hapi/hapi'
import routes from './routes'
import { Container } from 'instances-container'
import ThreadsHandler from './handler'

export default {
  name: 'threads',
  register: async (server: Server, { container }: { container: Container }) => {
    const threadsHandler = new ThreadsHandler(container)
    server.route(routes(threadsHandler))
  }
}
