import { Role } from '.'

let role

beforeEach(async () => {
  role = await Role.create({ roleName: 'test', roleCode: 'test', status: 'test', createdBy: 'test', createdAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = role.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(role.id)
    expect(view.roleName).toBe(role.roleName)
    expect(view.roleCode).toBe(role.roleCode)
    expect(view.status).toBe(role.status)
    expect(view.createdBy).toBe(role.createdBy)
    expect(view.createdAt).toBe(role.createdAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = role.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(role.id)
    expect(view.roleName).toBe(role.roleName)
    expect(view.roleCode).toBe(role.roleCode)
    expect(view.status).toBe(role.status)
    expect(view.createdBy).toBe(role.createdBy)
    expect(view.createdAt).toBe(role.createdAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
