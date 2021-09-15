import CommentsHandler from './handler'

const routes = (handler: CommentsHandler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postCommentHandler,
    options: {
      auth: 'forumapi_jwt'
    }
  }
])

export default routes
