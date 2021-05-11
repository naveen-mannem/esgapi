import { ErrorDetails } from '.'
import { User } from '../user'

let user, errorDetails

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  errorDetails = await ErrorDetails.create({ createdBy: user, errorTypeId: 'test', taskId: 'test', loggedBy: 'test', comments: 'test', errorLoggedDate: 'test', errorStatus: 'test', standaloneId: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = errorDetails.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(errorDetails.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.errorTypeId).toBe(errorDetails.errorTypeId)
    expect(view.taskId).toBe(errorDetails.taskId)
    expect(view.loggedBy).toBe(errorDetails.loggedBy)
    expect(view.comments).toBe(errorDetails.comments)
    expect(view.errorLoggedDate).toBe(errorDetails.errorLoggedDate)
    expect(view.errorStatus).toBe(errorDetails.errorStatus)
    expect(view.standaloneId).toBe(errorDetails.standaloneId)
    expect(view.status).toBe(errorDetails.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = errorDetails.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(errorDetails.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.errorTypeId).toBe(errorDetails.errorTypeId)
    expect(view.taskId).toBe(errorDetails.taskId)
    expect(view.loggedBy).toBe(errorDetails.loggedBy)
    expect(view.comments).toBe(errorDetails.comments)
    expect(view.errorLoggedDate).toBe(errorDetails.errorLoggedDate)
    expect(view.errorStatus).toBe(errorDetails.errorStatus)
    expect(view.standaloneId).toBe(errorDetails.standaloneId)
    expect(view.status).toBe(errorDetails.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
