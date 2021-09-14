import NewThread from './entities/NewThread'
import AddedThread from './entities/AddedThread'

interface ThreadRepository{
    addThread(thread: NewThread): Promise<AddedThread>
}
export default ThreadRepository
