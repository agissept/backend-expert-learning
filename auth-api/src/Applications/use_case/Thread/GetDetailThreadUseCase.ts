import UnvalidatedPayload from '../../../Commons/interface/UnvalidatedPayload'
import ThreadRepository from '../../../Domains/threads/ThreadRepository'
import GetDetailThreadFactory from '../../../Domains/threads/entities/GetDetailThread/GetDetailThreadFactory'

class GetDetailThreadUseCase {
  private readonly threadRepository: ThreadRepository;

  constructor ({ threadRepository }: UnvalidatedPayload) {
    this.threadRepository = threadRepository
  }

  async execute (threadId: string) {
    const factory = new GetDetailThreadFactory(this.threadRepository)
    return await factory.create(threadId)
  }
}

export default GetDetailThreadUseCase
