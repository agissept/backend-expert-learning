/* istanbul ignore file */
import dotenv from 'dotenv'
import { Pool } from 'pg'

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.testing' })
} else {
  dotenv.config()
}

export default new Pool()
