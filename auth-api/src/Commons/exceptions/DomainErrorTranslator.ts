import InvariantError from './InvariantError'
import NotFoundError from './NotFoundError'
import AuthorizationError from './AuthorizationError'

class DomainErrorTranslator {
  private static directories : { [key: string]: any } = {
    'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
    'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
    'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
    'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
    'REGISTER_USER.USERNAME_IS_TAKEN': new InvariantError('username tidak tersedia'),
    'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
    'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
    'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
    'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
    'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
    'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
    'NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat thread baru karena yang dibutuhkan tidak ada'),
    'NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada'),
    'NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('idak dapat membuat komentar baru karena tipe data tidak sesuai'),
    'NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada'),
    'NEW_COMMENT.THREAD_ID_IS_INVALID': new NotFoundError('tidak dapat membuat komentar baru karena thread tidak valid'),
    'DELETE_COMMENT.CANNOT_WRITE_THIS_RESOURCE': new AuthorizationError('tidak dapat menghapus komentar ini akses tidak valid'),
    'DELETE_COMMENT.COMMENT_ID_IS_INVALID': new NotFoundError('tidak dapat menghapus komentar karena thread komentar tidak ada'),
    'NEW_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat balasan baru karena properti yang dibutuhkan tidak ada'),
    'NEW_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat balasan baru karena tipe data tidak sesuai'),
    'NEW_REPLY.COMMENT_ID_IS_INVALID': new NotFoundError('tidak dapat membuat balasan baru karena koemntar tidak  tidak valid'),
    'NEW_REPLY.THREAD_ID_IS_INVALID': new NotFoundError('tidak dapat membuat balasan baru karena thread tidak  tidak valid')

  }

  static translate (error: Error) {
    return this.directories[error.message] || error
  }
}

export default DomainErrorTranslator
