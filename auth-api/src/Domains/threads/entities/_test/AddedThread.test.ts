import NewThread from '../NewThread'
import AddedThread from '../AddedThread'

describe('a AddedThread factory', () => {
  it('should create newThread object correctly', () => {
    const userId = 'user-123'
    const newThread = new NewThread({
      title: 'ini adalah judul',
      body: 'ini adalah kontent'
    }, userId)

    const threadId = 'thread-1'
    const addedThread = new AddedThread(threadId, newThread)

    expect(addedThread.id).toEqual(threadId)
    expect(addedThread.owner).toEqual(newThread.userId)
    expect(addedThread.title).toEqual(newThread.title)
  })
})
