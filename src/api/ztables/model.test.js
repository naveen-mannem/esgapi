import { Ztables } from '.'
import { User } from '../user'

let user, ztables

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  ztables = await Ztables.create({ createdBy: user, zScore: 'test', values: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = ztables.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ztables.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.zScore).toBe(ztables.zScore)
    expect(view.values).toBe(ztables.values)
    expect(view.status).toBe(ztables.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = ztables.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ztables.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.zScore).toBe(ztables.zScore)
    expect(view.values).toBe(ztables.values)
    expect(view.status).toBe(ztables.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
