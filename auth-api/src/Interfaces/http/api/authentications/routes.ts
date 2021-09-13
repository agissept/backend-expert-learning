import AuthenticationsHandler from './handler'

const routes = (handler: AuthenticationsHandler) => ([
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler
  }
])

export default routes
