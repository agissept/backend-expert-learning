import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'
import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import ThreadRepository from '../../../Domains/threads/ThreadRepository'
import NewThreadFactory from '../../../Domains/threads/factory/NewThread/NewThreadFactory'

class AddThreadUseCase {
    private threadRepository: ThreadRepository;

    constructor ({ threadRepository }: UseCaseConstructor) {
      this.threadRepository = threadRepository
    }

    async execute (payload: UnvalidatedPayload, userId: string) {
      const newThreadFactory = new NewThreadFactory()
      const newThread = newThreadFactory.create(payload, userId)
      return await this.threadRepository.addThread(newThread)
    }
}

export default AddThreadUseCase
