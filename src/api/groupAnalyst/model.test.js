import { GroupAnalyst } from '.'
import { User } from '../user'

let user, groupAnalyst

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  groupAnalyst = await GroupAnalyst.create({ createdBy: user, userId: 'test', groupId: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = groupAnalyst.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groupAnalyst.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.userId).toBe(groupAnalyst.userId)
    expect(view.groupId).toBe(groupAnalyst.groupId)
    expect(view.status).toBe(groupAnalyst.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = groupAnalyst.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groupAnalyst.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.userId).toBe(groupAnalyst.userId)
    expect(view.groupId).toBe(groupAnalyst.groupId)
    expect(view.status).toBe(groupAnalyst.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
