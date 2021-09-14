import UseCaseConstructor from '../../../Commons/interface/UseCaseConstructor'
import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import ThreadRepository from '../../../Domains/threads/ThreadRepository'
import NewThread from '../../../Domains/threads/entities/NewThread'

class AddThreadUseCase {
    private threadRepository: ThreadRepository;

    constructor ({ threadRepository }: UseCaseConstructor) {
      this.threadRepository = threadRepository
    }

    async execute (payload: UnvalidatedPayload, userId: string) {
      const newThread = new NewThread(payload, userId)
      return await this.threadRepository.addThread(newThread)
    }
}

export default AddThreadUseCase
