/* istanbul ignore file */
import dotenv from 'dotenv'
import { Pool } from 'pg'

const getPool = () => {
  if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.testing' })
  } else {
    dotenv.config()
  }
  return new Pool()
}

export default getPool()
