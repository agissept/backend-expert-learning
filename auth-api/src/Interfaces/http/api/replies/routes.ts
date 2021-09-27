import RepliesHandler from './handler'

const routes = (handler: RepliesHandler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: handler.postReplyHandler,
    options: {
      auth: 'forumapi_jwt'
    }
  }
])

export default routes
