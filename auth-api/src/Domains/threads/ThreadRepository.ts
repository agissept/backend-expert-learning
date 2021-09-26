import ThreadDTO from './model/RepositoryModel/ThreadDTO'
import NewThread from './model/DomainModel/NewThread'
import AddedThread from './model/DomainModel/AddedThread'

interface ThreadRepository{
    getDetailThread(threadId: string): Promise<ThreadDTO>

    addThread(thread: NewThread): Promise<AddedThread>

    isThreadHasCreated(threadId: string): Promise<boolean>
}
export default ThreadRepository
