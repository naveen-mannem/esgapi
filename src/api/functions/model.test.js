import { Functions } from '.'

let functions

beforeEach(async () => {
  functions = await Functions.create({ functionType: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = functions.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(functions.id)
    expect(view.functionType).toBe(functions.functionType)
    expect(view.status).toBe(functions.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = functions.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(functions.id)
    expect(view.functionType).toBe(functions.functionType)
    expect(view.status).toBe(functions.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
