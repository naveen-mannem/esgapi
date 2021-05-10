import { Controversy } from '.'

let controversy

beforeEach(async () => {
  controversy = await Controversy.create({ dpCodeId: 'test', companyId: 'test', year: 'test', sourceName: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', response: 'test', submittedDate: 'test', submittedBy: 'test', activeStatus: 'test', status: 'test', createdBy: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = controversy.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(controversy.id)
    expect(view.dpCodeId).toBe(controversy.dpCodeId)
    expect(view.companyId).toBe(controversy.companyId)
    expect(view.year).toBe(controversy.year)
    expect(view.sourceName).toBe(controversy.sourceName)
    expect(view.sourceUrl).toBe(controversy.sourceUrl)
    expect(view.sourcePublicationDate).toBe(controversy.sourcePublicationDate)
    expect(view.response).toBe(controversy.response)
    expect(view.submittedDate).toBe(controversy.submittedDate)
    expect(view.submittedBy).toBe(controversy.submittedBy)
    expect(view.activeStatus).toBe(controversy.activeStatus)
    expect(view.status).toBe(controversy.status)
    expect(view.createdBy).toBe(controversy.createdBy)
    expect(view.createdAt).toBe(controversy.createdAt)
    expect(view.updatedAt).toBe(controversy.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = controversy.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(controversy.id)
    expect(view.dpCodeId).toBe(controversy.dpCodeId)
    expect(view.companyId).toBe(controversy.companyId)
    expect(view.year).toBe(controversy.year)
    expect(view.sourceName).toBe(controversy.sourceName)
    expect(view.sourceUrl).toBe(controversy.sourceUrl)
    expect(view.sourcePublicationDate).toBe(controversy.sourcePublicationDate)
    expect(view.response).toBe(controversy.response)
    expect(view.submittedDate).toBe(controversy.submittedDate)
    expect(view.submittedBy).toBe(controversy.submittedBy)
    expect(view.activeStatus).toBe(controversy.activeStatus)
    expect(view.status).toBe(controversy.status)
    expect(view.createdBy).toBe(controversy.createdBy)
    expect(view.createdAt).toBe(controversy.createdAt)
    expect(view.updatedAt).toBe(controversy.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
