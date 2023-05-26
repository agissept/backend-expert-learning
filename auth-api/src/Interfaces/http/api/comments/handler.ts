import { Container } from 'instances-container'
import autoBind from 'auto-bind'
import { Request, ResponseToolkit } from '@hapi/hapi'
import AddCommentUseCase from '../../../../Applications/use_case/Comment/AddCommentUseCase'
import DeleteCommentUseCase from '../../../../Applications/use_case/Comment/DeleteCommentUseCase'
import LikeCommentUseCase from '../../../../Applications/use_case/LikeComment/LikeCommentUseCase'

class CommentsHandler {
    private container: Container

    constructor (container: Container) {
      this.container = container

      autoBind(this)
    }

    async postCommentHandler ({ payload, auth, params }: Request, h: ResponseToolkit) {
      const { id: userId } = auth.credentials
      const { threadId } = params

      const addCommentUseCase = this.container.getInstance(AddCommentUseCase.name) as AddCommentUseCase
      const addedComment = await addCommentUseCase.execute(payload, userId as string, threadId)

      return h.response({
        status: 'success',
        data: {
          addedComment
        }
      }).code(201)
    }

    async deleteCommentHandler ({ auth, params }: Request) {
      const { id: userId } = auth.credentials
      const { threadId, commentId } = params

      const deleteCommentUseCase = this.container.getInstance(DeleteCommentUseCase.name) as DeleteCommentUseCase
      await deleteCommentUseCase.execute(userId as string, threadId, commentId)

      return {
        status: 'success'
      }
    }

    async likeComment ({ auth, params }: Request) {
      const { id: userId } = auth.credentials
      const { threadId, commentId } = params

      const likeCommentUseCase = this.container.getInstance(LikeCommentUseCase.name) as LikeCommentUseCase
      await likeCommentUseCase.execute(userId as string, threadId, commentId)
      return {
        status: 'success'
      }
    }
}

export default CommentsHandler
