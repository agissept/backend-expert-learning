import NewThread from './entities/NewThread'
import AddedThread from './entities/AddedThread'
import ThreadDTO from './model/RepositoryModel/ThreadDTO'

interface ThreadRepository{
    getDetailThread(threadId: string): Promise<ThreadDTO>

    addThread(thread: NewThread): Promise<AddedThread>

    isThreadHasCreated(threadId: string): Promise<boolean>
}
export default ThreadRepository
