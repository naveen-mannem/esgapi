import { CompanyRepAssignment } from '.'

let companyRepAssignment

beforeEach(async () => {
  companyRepAssignment = await CompanyRepAssignment.create({ userId: 'test', assignedId: 'test', assignedDate: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = companyRepAssignment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(companyRepAssignment.id)
    expect(view.userId).toBe(companyRepAssignment.userId)
    expect(view.assignedId).toBe(companyRepAssignment.assignedId)
    expect(view.assignedDate).toBe(companyRepAssignment.assignedDate)
    expect(view.status).toBe(companyRepAssignment.status)
    expect(view.createdAt).toBe(companyRepAssignment.createdAt)
    expect(view.updatedAt).toBe(companyRepAssignment.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = companyRepAssignment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(companyRepAssignment.id)
    expect(view.userId).toBe(companyRepAssignment.userId)
    expect(view.assignedId).toBe(companyRepAssignment.assignedId)
    expect(view.assignedDate).toBe(companyRepAssignment.assignedDate)
    expect(view.status).toBe(companyRepAssignment.status)
    expect(view.createdAt).toBe(companyRepAssignment.createdAt)
    expect(view.updatedAt).toBe(companyRepAssignment.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
