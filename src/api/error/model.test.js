import { Error } from '.'

let error

beforeEach(async () => {
  error = await Error.create({ errorTypeName: 'test', errorBucket: 'test', errorDefinition: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = error.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(error.id)
    expect(view.errorTypeName).toBe(error.errorTypeName)
    expect(view.errorBucket).toBe(error.errorBucket)
    expect(view.errorDefinition).toBe(error.errorDefinition)
    expect(view.status).toBe(error.status)
    expect(view.createdAt).toBe(error.createdAt)
    expect(view.updatedAt).toBe(error.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = error.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(error.id)
    expect(view.errorTypeName).toBe(error.errorTypeName)
    expect(view.errorBucket).toBe(error.errorBucket)
    expect(view.errorDefinition).toBe(error.errorDefinition)
    expect(view.status).toBe(error.status)
    expect(view.createdAt).toBe(error.createdAt)
    expect(view.updatedAt).toBe(error.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
