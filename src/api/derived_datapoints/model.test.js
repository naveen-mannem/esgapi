import { DerivedDatapoints } from '.'
import { User } from '../user'

let user, derivedDatapoints

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  derivedDatapoints = await DerivedDatapoints.create({ createdBy: user, companyId: 'test', datapointId: 'test', response: 'test', performanceResult: 'test', memberName: 'test', activeStatus: 'test', dpStatus: 'test', year: 'test', fiscalYearEndDate: 'test', lastModifiedDate: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = derivedDatapoints.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(derivedDatapoints.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.companyId).toBe(derivedDatapoints.companyId)
    expect(view.datapointId).toBe(derivedDatapoints.datapointId)
    expect(view.response).toBe(derivedDatapoints.response)
    expect(view.performanceResult).toBe(derivedDatapoints.performanceResult)
    expect(view.memberName).toBe(derivedDatapoints.memberName)
    expect(view.activeStatus).toBe(derivedDatapoints.activeStatus)
    expect(view.dpStatus).toBe(derivedDatapoints.dpStatus)
    expect(view.year).toBe(derivedDatapoints.year)
    expect(view.fiscalYearEndDate).toBe(derivedDatapoints.fiscalYearEndDate)
    expect(view.lastModifiedDate).toBe(derivedDatapoints.lastModifiedDate)
    expect(view.status).toBe(derivedDatapoints.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = derivedDatapoints.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(derivedDatapoints.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.companyId).toBe(derivedDatapoints.companyId)
    expect(view.datapointId).toBe(derivedDatapoints.datapointId)
    expect(view.response).toBe(derivedDatapoints.response)
    expect(view.performanceResult).toBe(derivedDatapoints.performanceResult)
    expect(view.memberName).toBe(derivedDatapoints.memberName)
    expect(view.activeStatus).toBe(derivedDatapoints.activeStatus)
    expect(view.dpStatus).toBe(derivedDatapoints.dpStatus)
    expect(view.year).toBe(derivedDatapoints.year)
    expect(view.fiscalYearEndDate).toBe(derivedDatapoints.fiscalYearEndDate)
    expect(view.lastModifiedDate).toBe(derivedDatapoints.lastModifiedDate)
    expect(view.status).toBe(derivedDatapoints.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
