import { Pool } from 'pg'
import IdGenerator from '../../util/IdGenerator/IdGenerator'
import ThreadRepositoryPostgres from '../ThreadRepositoryPostgres'
import NewThread from '../../../Domains/threads/model/DomainModel/NewThread'

describe('ThreadRepositoryPostgres', () => {
  it('should throw error when add data is failed', function () {
    const newThread = {} as NewThread
    const pool = <Pool>{}
    const idGenerator = <IdGenerator>{}

    const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, idGenerator)
    idGenerator.generate = jest.fn().mockImplementation(() => '123')
    pool.query = jest.fn().mockImplementation(() => Promise.reject)

    expect(threadRepositoryPostgres.addThread(newThread)).rejects.toThrowError('data gagal ditambahkan')
  })
})
