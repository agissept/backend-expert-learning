/* istanbul ignore file */
import dotenv from 'dotenv-flow'
import { Pool } from 'pg'
dotenv.config({ silent: true })
export default new Pool()
