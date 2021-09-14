import NewThread from '../NewThread'

describe('NewThread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'title'
    }
    const userId = 'ssss'

    // Action & Assert
    expect(() => new NewThread(payload, userId)).toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      body: 'body'
    }
    const userId = 'user-1'

    // Action & Assert
    expect(() => new NewThread(payload, userId)).toThrowError('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create NewThread entities correctly', () => {
    // Arrange
    const payload = {
      title: 'ini adalah judul',
      body: 'ini adalah body'
    }

    const userId = 'user-1'

    // Action
    const newThread = new NewThread(payload, userId)
    expect(newThread).toBeInstanceOf(NewThread)
    expect(newThread.userId).toEqual(userId)
    expect(newThread.title).toEqual(payload.title)
    expect(newThread.body).toEqual(payload.body)

    // Assert
  })
})
