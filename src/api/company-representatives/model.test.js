import { CompanyRepresentatives } from '.'
import { User } from '../user'

let user, companyRepresentatives

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  companyRepresentatives = await CompanyRepresentatives.create({ createdBy: user, userId: 'test', name: 'test', companiesList: 'test', authenticationLetterForCompanyUrl: 'test', companyIdForCompany: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = companyRepresentatives.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(companyRepresentatives.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.userId).toBe(companyRepresentatives.userId)
    expect(view.name).toBe(companyRepresentatives.name)
    expect(view.companiesList).toBe(companyRepresentatives.companiesList)
    expect(view.authenticationLetterForCompanyUrl).toBe(companyRepresentatives.authenticationLetterForCompanyUrl)
    expect(view.companyIdForCompany).toBe(companyRepresentatives.companyIdForCompany)
    expect(view.status).toBe(companyRepresentatives.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = companyRepresentatives.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(companyRepresentatives.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.userId).toBe(companyRepresentatives.userId)
    expect(view.name).toBe(companyRepresentatives.name)
    expect(view.companiesList).toBe(companyRepresentatives.companiesList)
    expect(view.authenticationLetterForCompanyUrl).toBe(companyRepresentatives.authenticationLetterForCompanyUrl)
    expect(view.companyIdForCompany).toBe(companyRepresentatives.companyIdForCompany)
    expect(view.status).toBe(companyRepresentatives.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
