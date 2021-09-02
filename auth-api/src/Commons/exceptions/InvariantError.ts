import ClientError from './ClientError'

class InvariantError extends ClientError {
  constructor (message: string) {
    /* istanbul ignore next */
    super(message)
    this.name = 'InvariantError'
  }
}

export default InvariantError
