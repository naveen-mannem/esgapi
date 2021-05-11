import { Group } from '.'
import { User } from '../user'

let user, group

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  group = await Group.create({ createdBy: user, groupName: 'test', groupAdmin: 'test', batchId: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = group.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(group.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.groupName).toBe(group.groupName)
    expect(view.groupAdmin).toBe(group.groupAdmin)
    expect(view.batchId).toBe(group.batchId)
    expect(view.status).toBe(group.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = group.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(group.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.groupName).toBe(group.groupName)
    expect(view.groupAdmin).toBe(group.groupAdmin)
    expect(view.batchId).toBe(group.batchId)
    expect(view.status).toBe(group.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
