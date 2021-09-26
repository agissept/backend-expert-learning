import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'
import NewThread from '../../model/DomainModel/NewThread'

class NewThreadFactory {
  create ({ title, body }: UnvalidatedPayload, userId: string): NewThread {
    if (!title || !body || !userId) {
      throw new Error('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof title !== 'string' || typeof body !== 'string') {
      throw new Error('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }

    return {
      title,
      body,
      userId
    }
  }
}

export default NewThreadFactory
