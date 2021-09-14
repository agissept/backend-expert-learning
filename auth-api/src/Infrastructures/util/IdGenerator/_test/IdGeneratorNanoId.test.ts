import IdGeneratorNanoId from '../IdGeneratorNanoId'
import { nanoid } from 'nanoid'

describe('IdGeneratorNanoId', () => {
  it('should generated random string', () => {
    const id = new IdGeneratorNanoId(nanoid).generate()

    expect(id).toHaveLength(16)
  })
})
