import NewThread from '../../../../Domains/threads/entities/NewThread'
import AddThreadUseCase from '../AddThreadUseCase'
import ThreadRepository from '../../../../Domains/threads/ThreadRepository'

describe('AddThreadUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    const useCasePayload = {
      title: 'ini adalah judul',
      body: 'ini adalah body'
    }

    const userId = 'user-1'

    const expectedThread = new NewThread({
      title: useCasePayload.title,
      body: useCasePayload.body
    }, userId)

    const mockThreadRepository = <ThreadRepository>{}

    mockThreadRepository.addThread = jest.fn().mockImplementation(() => Promise.resolve())

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
