/* istanbul ignore file */
import dotenv from 'dotenv-flow'
import { Pool } from 'pg'
const { parsed } = dotenv.config({ silent: true })
const pool = new Pool({
  database: parsed?.PGDATABASE,
  user: parsed?.PGUSER,
  password: parsed?.PGPASSWORD,
  host: parsed?.PGHOST,
  port: parsed?.PGPORT as unknown as number
})
export default pool
