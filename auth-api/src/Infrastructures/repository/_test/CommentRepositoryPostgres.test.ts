import { Pool } from 'pg'
import IdGenerator from '../../util/IdGenerator/IdGenerator'
import CommentRepositoryPostgres from '../CommentRepositoryPostgres'
import NewComment from '../../../Domains/comment/entities/NewComment/NewComment'

describe('CommentRepositoryPostgres', () => {
  it('should throw error when add data is failed', () => {
    const newComment = <NewComment>{}
    const pool = <Pool>{}
    const idGenerator = <IdGenerator>{}

    const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, idGenerator)
    idGenerator.generate = jest.fn().mockImplementation(() => '123')
    pool.query = jest.fn().mockImplementation(() => Promise.reject)

    expect(commentRepositoryPostgres.addComment(newComment)).rejects.toThrowError('data gagal ditambahkan')
  })
})
