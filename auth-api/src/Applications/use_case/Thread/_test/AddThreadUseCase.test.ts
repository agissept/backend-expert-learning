import NewThread from '../../../../Domains/threads/entities/NewThread'
import AddThreadUseCase from '../AddThreadUseCase'
import ThreadRepository from '../../../../Domains/threads/ThreadRepository'
import AddedThread from '../../../../Domains/threads/entities/AddedThread'

describe('AddThreadUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    const useCasePayload = {
      title: 'ini adalah judul',
      body: 'ini adalah body'
    }

    const userId = 'user-1'
    const threadId = 'thread-1'

    const expectedThread = new AddedThread(threadId, new NewThread(useCasePayload, userId))

    const mockThreadRepository = <ThreadRepository>{}

    mockThreadRepository.addThread = jest.fn().mockImplementation(() => Promise.resolve(expectedThread))

    const addThreadUseCase = new AddThreadUseCase({ threadRepository: mockThreadRepository })

    const addThread = await addThreadUseCase.execute(useCasePayload, userId)

    expect(addThread).toStrictEqual(expectedThread)
    expect(mockThreadRepository.addThread).toBeCalledWith(new NewThread({
      title: useCasePayload.title,
      body: useCasePayload.body
    }, userId)
    )
  })
})
