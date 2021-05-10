import { ErrorDetails } from '.'

let errorDetails

beforeEach(async () => {
  errorDetails = await ErrorDetails.create({ errorTypeId: 'test', taskId: 'test', loggedBy: 'test', comments: 'test', errorLoggedDate: 'test', errorStatus: 'test', standAlonId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = errorDetails.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(errorDetails.id)
    expect(view.errorTypeId).toBe(errorDetails.errorTypeId)
    expect(view.taskId).toBe(errorDetails.taskId)
    expect(view.loggedBy).toBe(errorDetails.loggedBy)
    expect(view.comments).toBe(errorDetails.comments)
    expect(view.errorLoggedDate).toBe(errorDetails.errorLoggedDate)
    expect(view.errorStatus).toBe(errorDetails.errorStatus)
    expect(view.standAlonId).toBe(errorDetails.standAlonId)
    expect(view.status).toBe(errorDetails.status)
    expect(view.createdAt).toBe(errorDetails.createdAt)
    expect(view.updatedAt).toBe(errorDetails.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = errorDetails.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(errorDetails.id)
    expect(view.errorTypeId).toBe(errorDetails.errorTypeId)
    expect(view.taskId).toBe(errorDetails.taskId)
    expect(view.loggedBy).toBe(errorDetails.loggedBy)
    expect(view.comments).toBe(errorDetails.comments)
    expect(view.errorLoggedDate).toBe(errorDetails.errorLoggedDate)
    expect(view.errorStatus).toBe(errorDetails.errorStatus)
    expect(view.standAlonId).toBe(errorDetails.standAlonId)
    expect(view.status).toBe(errorDetails.status)
    expect(view.createdAt).toBe(errorDetails.createdAt)
    expect(view.updatedAt).toBe(errorDetails.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
