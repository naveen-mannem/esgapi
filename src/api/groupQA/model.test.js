import { GroupQa } from '.'

let groupQa

beforeEach(async () => {
  groupQa = await GroupQa.create({ userId: 'test', groupId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = groupQa.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groupQa.id)
    expect(view.userId).toBe(groupQa.userId)
    expect(view.groupId).toBe(groupQa.groupId)
    expect(view.status).toBe(groupQa.status)
    expect(view.createdAt).toBe(groupQa.createdAt)
    expect(view.updatedAt).toBe(groupQa.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = groupQa.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groupQa.id)
    expect(view.userId).toBe(groupQa.userId)
    expect(view.groupId).toBe(groupQa.groupId)
    expect(view.status).toBe(groupQa.status)
    expect(view.createdAt).toBe(groupQa.createdAt)
    expect(view.updatedAt).toBe(groupQa.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
