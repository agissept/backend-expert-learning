import UnvalidatedPayload from '../../../../Commons/interface/UnvalidatedPayload'

class NewComment {
    userId: string;
     threadId: string;
    content: string;

    constructor ({ content }: UnvalidatedPayload, userId: string, threadId: string) {
      if (!content) {
        throw new Error('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
      }

      if (typeof content !== 'string') {
        throw new Error('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
      }

      this.userId = userId
      this.threadId = threadId
      this.content = content
    }
}

export default NewComment
