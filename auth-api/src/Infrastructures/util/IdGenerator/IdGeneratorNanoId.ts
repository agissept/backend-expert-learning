import IdGenerator from './IdGenerator'

class IdGeneratorNanoId implements IdGenerator {
    private readonly nanoid

    constructor (nanoid: any) {
      this.nanoid = nanoid
    }

    generate (): string {
      return this.nanoid(16)
    }
}
export default IdGeneratorNanoId
