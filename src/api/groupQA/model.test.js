import { GroupQa } from '.'
import { User } from '../user'

let user, groupQa

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  groupQa = await GroupQa.create({ createdBy: user, userId: 'test', groupId: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = groupQa.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groupQa.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.userId).toBe(groupQa.userId)
    expect(view.groupId).toBe(groupQa.groupId)
    expect(view.status).toBe(groupQa.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = groupQa.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groupQa.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.userId).toBe(groupQa.userId)
    expect(view.groupId).toBe(groupQa.groupId)
    expect(view.status).toBe(groupQa.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
