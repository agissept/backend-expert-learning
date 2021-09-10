import AuthenticationsHandler from "./handler";

const routes = (handler: AuthenticationsHandler) => ([
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
  },
]);

export default routes
