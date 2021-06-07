import { Error } from '.'
import { User } from '../user'

let user, error

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  error = await Error.create({ createdBy: user, errorType: 'test', errorBucket: 'test', errorDefenition: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = error.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(error.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.errorType).toBe(error.errorType)
    expect(view.errorBucket).toBe(error.errorBucket)
    expect(view.errorDefenition).toBe(error.errorDefenition)
    expect(view.status).toBe(error.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = error.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(error.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.errorType).toBe(error.errorType)
    expect(view.errorBucket).toBe(error.errorBucket)
    expect(view.errorDefenition).toBe(error.errorDefenition)
    expect(view.status).toBe(error.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
