import NewThread from './NewThread'

class AddedThread {
    id: string;
    owner: string;
    title: string;

    constructor (id: string, { userId, title }: NewThread) {
      this.id = id
      this.title = title
      this.owner = userId
    }
}

export default AddedThread
