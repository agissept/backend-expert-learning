import NewThread from './entities/NewThread'
import AddedThread from './entities/AddedThread'
import DetailThread from './model/DetailThread'

interface ThreadRepository{
    getDetailThread(threadId: string): Promise<DetailThread>

    addThread(thread: NewThread): Promise<AddedThread>

    isThreadHasCreated(threadId: string): Promise<boolean>
}
export default ThreadRepository
