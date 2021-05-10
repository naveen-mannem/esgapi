import { TaskSlaLog } from '.'

let taskSlaLog

beforeEach(async () => {
  taskSlaLog = await TaskSlaLog.create({ taskId: 'test', currentDate: 'test', preferredDate: 'test', loggedBy: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = taskSlaLog.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(taskSlaLog.id)
    expect(view.taskId).toBe(taskSlaLog.taskId)
    expect(view.currentDate).toBe(taskSlaLog.currentDate)
    expect(view.preferredDate).toBe(taskSlaLog.preferredDate)
    expect(view.loggedBy).toBe(taskSlaLog.loggedBy)
    expect(view.status).toBe(taskSlaLog.status)
    expect(view.createdAt).toBe(taskSlaLog.createdAt)
    expect(view.updatedAt).toBe(taskSlaLog.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = taskSlaLog.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(taskSlaLog.id)
    expect(view.taskId).toBe(taskSlaLog.taskId)
    expect(view.currentDate).toBe(taskSlaLog.currentDate)
    expect(view.preferredDate).toBe(taskSlaLog.preferredDate)
    expect(view.loggedBy).toBe(taskSlaLog.loggedBy)
    expect(view.status).toBe(taskSlaLog.status)
    expect(view.createdAt).toBe(taskSlaLog.createdAt)
    expect(view.updatedAt).toBe(taskSlaLog.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
