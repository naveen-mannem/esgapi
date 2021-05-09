import { CompanyTaxonomies } from '.'
import { User } from '../user'

let user, companyTaxonomies

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  companyTaxonomies = await CompanyTaxonomies.create({ createdBy: user, companyId: 'test', taxonomies: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = companyTaxonomies.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(companyTaxonomies.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.companyId).toBe(companyTaxonomies.companyId)
    expect(view.taxonomies).toBe(companyTaxonomies.taxonomies)
    expect(view.status).toBe(companyTaxonomies.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = companyTaxonomies.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(companyTaxonomies.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.companyId).toBe(companyTaxonomies.companyId)
    expect(view.taxonomies).toBe(companyTaxonomies.taxonomies)
    expect(view.status).toBe(companyTaxonomies.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
