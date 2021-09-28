import routes from './routes'
import { Server } from '@hapi/hapi'
import { Container } from 'instances-container'
import RepliesHandler from './handler'

export default {
  name: 'replies',
  register: async (server: Server, { container }: { container: Container }) => {
    const repliesHandler = new RepliesHandler(container)
    server.route(routes(repliesHandler))
  }
}
