import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'

class NewThread {
    userId: string;
    title: string;
    body: string;

    constructor (payload: UnvalidatedPayload, userId: string) {
      this.verify(payload, userId)

      this.userId = userId
      this.title = payload.title
      this.body = payload.body
    }

    verify (payload: UnvalidatedPayload, userId: string) {
      const { title, body } = payload

      if (!title || !body || !userId) {
        throw new Error('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
      }

      if (typeof title !== 'string' || typeof body !== 'string') {
        throw new Error('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
      }
    }
}

export default NewThread