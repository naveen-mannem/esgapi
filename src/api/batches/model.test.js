import { Batches } from '.'
import { User } from '../user'

let user, batches

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  batches = await Batches.create({ createdBy: user, batchName: 'test', batchSLA: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = batches.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(batches.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.batchName).toBe(batches.batchName)
    expect(view.batchSLA).toBe(batches.batchSLA)
    expect(view.status).toBe(batches.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = batches.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(batches.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.batchName).toBe(batches.batchName)
    expect(view.batchSLA).toBe(batches.batchSLA)
    expect(view.status).toBe(batches.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
