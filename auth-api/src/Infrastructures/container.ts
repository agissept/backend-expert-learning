/*istanbul ignore file*/
import {createContainer} from "instances-container";
import {nanoid} from 'nanoid'
import UserRepository from "../Domains/users/UserRepository";
import UserRepositoryPostgres from "./repository/UserRepositoryPostgres";
import pool from "./database/postgres/pool";
import BcryptPasswordHash from "./security/BcryptPasswordHash";
import bcrypt from 'bcrypt'
import AddUserUseCase from "../Applications/use_case/AddUserUseCase";
import {nameof} from "ts-simple-nameof";
import Interfaces from "./Interfaces";

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
                    concrete: nanoid
                }

            ]
        }
    },
    {
        key:  nameof<Interfaces>(i => i.PasswordHash),
        Class: BcryptPasswordHash,
        parameter: {
            dependencies: [
                {
                    concrete: bcrypt,
                }
            ]
        }
    },
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
                },
            ]
        }
    }
])

export default container
