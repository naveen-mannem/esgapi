import { ClientTaxonomy } from '.'
import { User } from '../user'

let user, clientTaxonomy

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  clientTaxonomy = await ClientTaxonomy.create({ createdBy: user, taxonomyName: 'test', fields: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = clientTaxonomy.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(clientTaxonomy.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.taxonomyName).toBe(clientTaxonomy.taxonomyName)
    expect(view.fields).toBe(clientTaxonomy.fields)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = clientTaxonomy.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(clientTaxonomy.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.taxonomyName).toBe(clientTaxonomy.taxonomyName)
    expect(view.fields).toBe(clientTaxonomy.fields)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
