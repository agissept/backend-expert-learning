import NewThread from './entities/NewThread'
import AddedThread from './entities/AddedThread'

interface ThreadRepository{
    addThread(thread: NewThread): Promise<AddedThread>

    isThreadHasCreated(threadId: string): Promise<boolean>
}
export default ThreadRepository
