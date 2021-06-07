import { Reference } from '.'
import { User } from '../user'

let user, reference

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  reference = await Reference.create({ createdBy: user, standaloneId: 'test', sourceName: 'test', url: 'test', pageNumber: 'test', publicationDate: 'test', textSnippet: 'test', screenshotInPNG: 'test', screenshotType: 'test', filePath: 'test', activeStatus: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = reference.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reference.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.standaloneId).toBe(reference.standaloneId)
    expect(view.sourceName).toBe(reference.sourceName)
    expect(view.url).toBe(reference.url)
    expect(view.pageNumber).toBe(reference.pageNumber)
    expect(view.publicationDate).toBe(reference.publicationDate)
    expect(view.textSnippet).toBe(reference.textSnippet)
    expect(view.screenshotInPNG).toBe(reference.screenshotInPNG)
    expect(view.screenshotType).toBe(reference.screenshotType)
    expect(view.filePath).toBe(reference.filePath)
    expect(view.activeStatus).toBe(reference.activeStatus)
    expect(view.status).toBe(reference.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = reference.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reference.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.standaloneId).toBe(reference.standaloneId)
    expect(view.sourceName).toBe(reference.sourceName)
    expect(view.url).toBe(reference.url)
    expect(view.pageNumber).toBe(reference.pageNumber)
    expect(view.publicationDate).toBe(reference.publicationDate)
    expect(view.textSnippet).toBe(reference.textSnippet)
    expect(view.screenshotInPNG).toBe(reference.screenshotInPNG)
    expect(view.screenshotType).toBe(reference.screenshotType)
    expect(view.filePath).toBe(reference.filePath)
    expect(view.activeStatus).toBe(reference.activeStatus)
    expect(view.status).toBe(reference.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
