import { Server } from '@hapi/hapi'
import { Container } from 'instances-container'
import CommentsHandler from './handler'
import routes from './routes'

export default {
  name: 'comments',
  register: async (server: Server, { container }: { container: Container }) => {
    const commentsHandler = new CommentsHandler(container)
    server.route(routes(commentsHandler))
  }
}
