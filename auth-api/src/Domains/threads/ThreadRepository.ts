import NewThread from './entities/NewThread'

interface ThreadRepository{
    addThread(thread: NewThread): Promise<void>
}
export default ThreadRepository
