import { Categories } from '.'

let categories

beforeEach(async () => {
  categories = await Categories.create({ categoryName: 'test', categoryCode: 'test', categoryDescription: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = categories.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(categories.id)
    expect(view.categoryName).toBe(categories.categoryName)
    expect(view.categoryCode).toBe(categories.categoryCode)
    expect(view.categoryDescription).toBe(categories.categoryDescription)
    expect(view.status).toBe(categories.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = categories.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(categories.id)
    expect(view.categoryName).toBe(categories.categoryName)
    expect(view.categoryCode).toBe(categories.categoryCode)
    expect(view.categoryDescription).toBe(categories.categoryDescription)
    expect(view.status).toBe(categories.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
