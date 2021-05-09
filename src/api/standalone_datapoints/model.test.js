import { StandaloneDatapoints } from '.'
import { User } from '../user'

let user, standaloneDatapoints

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  standaloneDatapoints = await StandaloneDatapoints.create({ createdBy: user, companyId: 'test', performanceResult: 'test', response: 'test', year: 'test', standaloneStatus: 'test', taskId: 'test', submittedBy: 'test', submittedDate: 'test', activeStatus: 'test', lastModifiedDate: 'test', modifiedBy: 'test', isSubmitted: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = standaloneDatapoints.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(standaloneDatapoints.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.companyId).toBe(standaloneDatapoints.companyId)
    expect(view.performanceResult).toBe(standaloneDatapoints.performanceResult)
    expect(view.response).toBe(standaloneDatapoints.response)
    expect(view.year).toBe(standaloneDatapoints.year)
    expect(view.standaloneStatus).toBe(standaloneDatapoints.standaloneStatus)
    expect(view.taskId).toBe(standaloneDatapoints.taskId)
    expect(view.submittedBy).toBe(standaloneDatapoints.submittedBy)
    expect(view.submittedDate).toBe(standaloneDatapoints.submittedDate)
    expect(view.activeStatus).toBe(standaloneDatapoints.activeStatus)
    expect(view.lastModifiedDate).toBe(standaloneDatapoints.lastModifiedDate)
    expect(view.modifiedBy).toBe(standaloneDatapoints.modifiedBy)
    expect(view.isSubmitted).toBe(standaloneDatapoints.isSubmitted)
    expect(view.status).toBe(standaloneDatapoints.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = standaloneDatapoints.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(standaloneDatapoints.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.companyId).toBe(standaloneDatapoints.companyId)
    expect(view.performanceResult).toBe(standaloneDatapoints.performanceResult)
    expect(view.response).toBe(standaloneDatapoints.response)
    expect(view.year).toBe(standaloneDatapoints.year)
    expect(view.standaloneStatus).toBe(standaloneDatapoints.standaloneStatus)
    expect(view.taskId).toBe(standaloneDatapoints.taskId)
    expect(view.submittedBy).toBe(standaloneDatapoints.submittedBy)
    expect(view.submittedDate).toBe(standaloneDatapoints.submittedDate)
    expect(view.activeStatus).toBe(standaloneDatapoints.activeStatus)
    expect(view.lastModifiedDate).toBe(standaloneDatapoints.lastModifiedDate)
    expect(view.modifiedBy).toBe(standaloneDatapoints.modifiedBy)
    expect(view.isSubmitted).toBe(standaloneDatapoints.isSubmitted)
    expect(view.status).toBe(standaloneDatapoints.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
