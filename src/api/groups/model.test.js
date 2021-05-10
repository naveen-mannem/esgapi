import { Groups } from '.'

let groups

beforeEach(async () => {
  groups = await Groups.create({ groupName: 'test', groupAdmin: 'test', batchId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = groups.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groups.id)
    expect(view.groupName).toBe(groups.groupName)
    expect(view.groupAdmin).toBe(groups.groupAdmin)
    expect(view.batchId).toBe(groups.batchId)
    expect(view.status).toBe(groups.status)
    expect(view.createdAt).toBe(groups.createdAt)
    expect(view.updatedAt).toBe(groups.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = groups.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groups.id)
    expect(view.groupName).toBe(groups.groupName)
    expect(view.groupAdmin).toBe(groups.groupAdmin)
    expect(view.batchId).toBe(groups.batchId)
    expect(view.status).toBe(groups.status)
    expect(view.createdAt).toBe(groups.createdAt)
    expect(view.updatedAt).toBe(groups.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
