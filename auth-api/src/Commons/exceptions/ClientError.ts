abstract class ClientError extends Error {
  statusCode: number;

  protected constructor (message: string, statusCode = 400) {
    super(message)

    this.statusCode = statusCode
    this.name = 'ClientError'
  }
}
export default ClientError
