import { TaskAssignment } from '.'

let taskAssignment

beforeEach(async () => {
  taskAssignment = await TaskAssignment.create({ companyId: 'test', categoryId: 'test', groupId: 'test', revisionCode: 'test', assignedTo: 'test', year: 'test', analystSLA: 'test', taskStatus: 'test', analystEmail: 'test', qaEmail: 'test', qaSLA: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = taskAssignment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(taskAssignment.id)
    expect(view.companyId).toBe(taskAssignment.companyId)
    expect(view.categoryId).toBe(taskAssignment.categoryId)
    expect(view.groupId).toBe(taskAssignment.groupId)
    expect(view.revisionCode).toBe(taskAssignment.revisionCode)
    expect(view.assignedTo).toBe(taskAssignment.assignedTo)
    expect(view.year).toBe(taskAssignment.year)
    expect(view.analystSLA).toBe(taskAssignment.analystSLA)
    expect(view.taskStatus).toBe(taskAssignment.taskStatus)
    expect(view.analystEmail).toBe(taskAssignment.analystEmail)
    expect(view.qaEmail).toBe(taskAssignment.qaEmail)
    expect(view.qaSLA).toBe(taskAssignment.qaSLA)
    expect(view.status).toBe(taskAssignment.status)
    expect(view.createdAt).toBe(taskAssignment.createdAt)
    expect(view.updatedAt).toBe(taskAssignment.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = taskAssignment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(taskAssignment.id)
    expect(view.companyId).toBe(taskAssignment.companyId)
    expect(view.categoryId).toBe(taskAssignment.categoryId)
    expect(view.groupId).toBe(taskAssignment.groupId)
    expect(view.revisionCode).toBe(taskAssignment.revisionCode)
    expect(view.assignedTo).toBe(taskAssignment.assignedTo)
    expect(view.year).toBe(taskAssignment.year)
    expect(view.analystSLA).toBe(taskAssignment.analystSLA)
    expect(view.taskStatus).toBe(taskAssignment.taskStatus)
    expect(view.analystEmail).toBe(taskAssignment.analystEmail)
    expect(view.qaEmail).toBe(taskAssignment.qaEmail)
    expect(view.qaSLA).toBe(taskAssignment.qaSLA)
    expect(view.status).toBe(taskAssignment.status)
    expect(view.createdAt).toBe(taskAssignment.createdAt)
    expect(view.updatedAt).toBe(taskAssignment.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
