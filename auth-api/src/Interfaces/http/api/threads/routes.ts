import ThreadsHandler from './handler'

const routes = (handler: ThreadsHandler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
    options: {
      auth: 'forumapi_jwt'
    }
  }
])

export default routes
