import { Controversy } from '.'
import { User } from '../user'

let user, controversy

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  controversy = await Controversy.create({ createdBy: user, dpCodeId: 'test', companyId: 'test', year: 'test', sourceName: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', activeStatus: 'test', submittedBy: 'test', submittedDate: 'test', response: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = controversy.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(controversy.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.dpCodeId).toBe(controversy.dpCodeId)
    expect(view.companyId).toBe(controversy.companyId)
    expect(view.year).toBe(controversy.year)
    expect(view.sourceName).toBe(controversy.sourceName)
    expect(view.sourceUrl).toBe(controversy.sourceUrl)
    expect(view.sourcePublicationDate).toBe(controversy.sourcePublicationDate)
    expect(view.activeStatus).toBe(controversy.activeStatus)
    expect(view.submittedBy).toBe(controversy.submittedBy)
    expect(view.submittedDate).toBe(controversy.submittedDate)
    expect(view.response).toBe(controversy.response)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = controversy.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(controversy.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.dpCodeId).toBe(controversy.dpCodeId)
    expect(view.companyId).toBe(controversy.companyId)
    expect(view.year).toBe(controversy.year)
    expect(view.sourceName).toBe(controversy.sourceName)
    expect(view.sourceUrl).toBe(controversy.sourceUrl)
    expect(view.sourcePublicationDate).toBe(controversy.sourcePublicationDate)
    expect(view.activeStatus).toBe(controversy.activeStatus)
    expect(view.submittedBy).toBe(controversy.submittedBy)
    expect(view.submittedDate).toBe(controversy.submittedDate)
    expect(view.response).toBe(controversy.response)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
