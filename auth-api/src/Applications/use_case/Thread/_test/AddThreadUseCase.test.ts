import NewThreadFactory from '../../../../Domains/threads/factory/NewThread/NewThreadFactory'
import AddThreadUseCase from '../AddThreadUseCase'
import ThreadRepository from '../../../../Domains/threads/ThreadRepository'
import AddedThread from '../../../../Domains/threads/model/DomainModel/AddedThread'

describe('AddThreadUseCase', () => {
  const newThreadFactory = new NewThreadFactory()

  it('should orchestrating the add user action correctly', async () => {
    const useCasePayload = {
      title: 'ini adalah judul',
      body: 'ini adalah body'
    }

    const userId = 'user-1'
    const threadId = 'thread-1'
    const newThread = newThreadFactory.create(useCasePayload, userId)

    const expectedThread: AddedThread = { id: threadId, title: newThread.title, owner: newThread.userId }

    const mockThreadRepository = <ThreadRepository>{}

    mockThreadRepository.addThread = jest.fn().mockImplementation(() => Promise.resolve(expectedThread))

    const addThreadUseCase = new AddThreadUseCase({ threadRepository: mockThreadRepository })

    const addThread = await addThreadUseCase.execute(useCasePayload, userId)

    expect(addThread).toStrictEqual(expectedThread)
    expect(mockThreadRepository.addThread).toBeCalledWith(newThreadFactory.create({
      title: useCasePayload.title,
      body: useCasePayload.body
    }, userId)
    )
  })
})
