import { MasterTaxonomy } from '.'
import { User } from '../user'

let user, masterTaxonomy

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  masterTaxonomy = await MasterTaxonomy.create({ createdBy: user, fields: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = masterTaxonomy.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(masterTaxonomy.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.fields).toBe(masterTaxonomy.fields)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = masterTaxonomy.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(masterTaxonomy.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.fields).toBe(masterTaxonomy.fields)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
