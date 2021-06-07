import { Themes } from '.'

let themes

beforeEach(async () => {
  themes = await Themes.create({ themeName: 'test', themeCode: 'test', themeDescription: 'test', categoryId: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = themes.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(themes.id)
    expect(view.themeName).toBe(themes.themeName)
    expect(view.themeCode).toBe(themes.themeCode)
    expect(view.themeDescription).toBe(themes.themeDescription)
    expect(view.categoryId).toBe(themes.categoryId)
    expect(view.status).toBe(themes.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = themes.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(themes.id)
    expect(view.themeName).toBe(themes.themeName)
    expect(view.themeCode).toBe(themes.themeCode)
    expect(view.themeDescription).toBe(themes.themeDescription)
    expect(view.categoryId).toBe(themes.categoryId)
    expect(view.status).toBe(themes.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
