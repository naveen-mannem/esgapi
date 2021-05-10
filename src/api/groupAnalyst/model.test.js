import { GroupAnalyst } from '.'

let groupAnalyst

beforeEach(async () => {
  groupAnalyst = await GroupAnalyst.create({ userId: 'test', groupId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = groupAnalyst.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groupAnalyst.id)
    expect(view.userId).toBe(groupAnalyst.userId)
    expect(view.groupId).toBe(groupAnalyst.groupId)
    expect(view.status).toBe(groupAnalyst.status)
    expect(view.createdAt).toBe(groupAnalyst.createdAt)
    expect(view.updatedAt).toBe(groupAnalyst.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = groupAnalyst.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groupAnalyst.id)
    expect(view.userId).toBe(groupAnalyst.userId)
    expect(view.groupId).toBe(groupAnalyst.groupId)
    expect(view.status).toBe(groupAnalyst.status)
    expect(view.createdAt).toBe(groupAnalyst.createdAt)
    expect(view.updatedAt).toBe(groupAnalyst.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
