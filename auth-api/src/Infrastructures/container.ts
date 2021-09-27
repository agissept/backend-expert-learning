/* istanbul ignore file */
import { createContainer } from 'instances-container'
import { nanoid } from 'nanoid'
import UserRepositoryPostgres from './repository/UserRepositoryPostgres'
import pool from './database/postgres/pool'
import BcryptPasswordHash from './security/BcryptPasswordHash'
import bcrypt from 'bcrypt'
import AddUserUseCase from '../Applications/use_case/AddUser/AddUserUseCase'
import { nameof } from 'ts-simple-nameof'
import Interfaces from './Interfaces'
import LoginUserUseCase from '../Applications/use_case/Login/LoginUserUseCase'
import AuthenticationRepositoryPostgres from './repository/AuthenticationRepositoryPostgres'
import JwtTokenManager from './security/JwtTokenManager'
import Jwt from '@hapi/jwt'
import RefreshAuthenticationUseCase from '../Applications/use_case/Authentication/RefreshAuthenticationUseCase'
import LogoutUserUseCase from '../Applications/use_case/Logout/LogoutUserUseCase'
import AddThreadUseCase from '../Applications/use_case/Thread/AddThreadUseCase'
import ThreadRepositoryPostgres from './repository/ThreadRepositoryPostgres'
import IdGeneratorNanoId from './util/IdGenerator/IdGeneratorNanoId'
import AddCommentUseCase from '../Applications/use_case/Comment/AddCommentUseCase'
import CommentRepositoryPostgres from './repository/CommentRepositoryPostgres'
import DeleteCommentUseCase from '../Applications/use_case/Comment/DeleteCommentUseCase'
import GetDetailThreadUseCase from '../Applications/use_case/Thread/GetDetailThreadUseCase'
import ReplyRepositoryPostgres from './repository/ReplyRepositoryPostgres'
import AddReplyUseCase from '../Applications/use_case/Reply/AddReplyUseCase'

const container = createContainer()

// registering services and repository
container.register([
  {
    key: nameof<Interfaces>(i => i.UserRepository),
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool
        },
        {
          internal: 'IdGenerator'
        }

      ]
    }
  },
  {
    key: nameof<Interfaces>(i => i.PasswordHash),
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt
        }
      ]
    }
  },
  {
    key: nameof<Interfaces>(i => i.AuthenticationRepository),
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool
        }
      ]
    }
  },
  {
    key: nameof<Interfaces>(i => i.AuthenticationTokenManager),
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token
        }
      ]
    }
  }, {
    key: 'IdGenerator',
    Class: IdGeneratorNanoId,
    parameter: {
      dependencies: [
        {
          concrete: nanoid
        }
      ]
    }
  },
  {
    key: 'ThreadRepository',
    Class: ThreadRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool
        },
        {
          internal: 'IdGenerator'
        }
      ]
    }
  },
  {
    key: 'CommentRepository',
    Class: CommentRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool
        },
        {
          internal: 'IdGenerator'
        }
      ]
    }
  },
  {
    key: 'ReplyRepository',
    Class: ReplyRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool
        },
        {
          internal: 'IdGenerator'
        }
      ]
    }
  }

])

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: 'UserRepository'
        },
        {
          name: 'passwordHash',
          internal: 'PasswordHash'
        }
      ]
    }
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: 'UserRepository'
        },
        {
          name: 'authenticationRepository',
          internal: 'AuthenticationRepository'
        },
        {
          name: 'authenticationTokenManager',
          internal: 'AuthenticationTokenManager'
        },
        {
          name: 'passwordHash',
          internal: 'PasswordHash'
        }
      ]
    }
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationTokenManager',
          internal: 'AuthenticationTokenManager'
        },
        {
          name: 'authenticationRepository',
          internal: 'AuthenticationRepository'
        }

      ]
    }
  }, {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: 'AuthenticationRepository'
        }
      ]
    }
  },
  {
    key: AddThreadUseCase.name,
    Class: AddThreadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [{
        name: 'threadRepository',
        internal: 'ThreadRepository'
      }]
    }
  },
  {
    key: AddCommentUseCase.name,
    Class: AddCommentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadRepository',
          internal: 'ThreadRepository'
        },
        {
          name: 'commentRepository',
          internal: 'CommentRepository'
        }
      ]
    }
  },
  {
    key: DeleteCommentUseCase.name,
    Class: DeleteCommentUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadRepository',
          internal: 'ThreadRepository'
        },
        {
          name: 'commentRepository',
          internal: 'CommentRepository'
        }
      ]
    }
  },
  {
    key: GetDetailThreadUseCase.name,
    Class: GetDetailThreadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [{
        name: 'threadRepository',
        internal: 'ThreadRepository'
      },
      {
        name: 'commentRepository',
        internal: 'CommentRepository'
      }]
    }
  },
  {
    key: AddReplyUseCase.name,
    Class: AddReplyUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'replyRepository',
          internal: 'ReplyRepository'
        },
        {
          name: 'commentRepository',
          internal: 'CommentRepository'
        },
        {
          name: 'threadRepository',
          internal: 'ThreadRepository'
        }
      ]
    }
  }

])

export default container
