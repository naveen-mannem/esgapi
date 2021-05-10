import { Reference } from '.'

let reference

beforeEach(async () => {
  reference = await Reference.create({ standalonId: 'test', sourceName: 'test', url: 'test', pageNumber: 'test', publicationDate: 'test', textSnippet: 'test', screenshotInPNG: 'test', screenshotType: 'test', filePath: 'test', createdBy: 'test', activeStatus: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = reference.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reference.id)
    expect(view.standalonId).toBe(reference.standalonId)
    expect(view.sourceName).toBe(reference.sourceName)
    expect(view.url).toBe(reference.url)
    expect(view.pageNumber).toBe(reference.pageNumber)
    expect(view.publicationDate).toBe(reference.publicationDate)
    expect(view.textSnippet).toBe(reference.textSnippet)
    expect(view.screenshotInPNG).toBe(reference.screenshotInPNG)
    expect(view.screenshotType).toBe(reference.screenshotType)
    expect(view.filePath).toBe(reference.filePath)
    expect(view.createdBy).toBe(reference.createdBy)
    expect(view.activeStatus).toBe(reference.activeStatus)
    expect(view.status).toBe(reference.status)
    expect(view.createdAt).toBe(reference.createdAt)
    expect(view.updatedAt).toBe(reference.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = reference.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reference.id)
    expect(view.standalonId).toBe(reference.standalonId)
    expect(view.sourceName).toBe(reference.sourceName)
    expect(view.url).toBe(reference.url)
    expect(view.pageNumber).toBe(reference.pageNumber)
    expect(view.publicationDate).toBe(reference.publicationDate)
    expect(view.textSnippet).toBe(reference.textSnippet)
    expect(view.screenshotInPNG).toBe(reference.screenshotInPNG)
    expect(view.screenshotType).toBe(reference.screenshotType)
    expect(view.filePath).toBe(reference.filePath)
    expect(view.createdBy).toBe(reference.createdBy)
    expect(view.activeStatus).toBe(reference.activeStatus)
    expect(view.status).toBe(reference.status)
    expect(view.createdAt).toBe(reference.createdAt)
    expect(view.updatedAt).toBe(reference.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
