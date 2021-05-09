import { KeyIssues } from '.'

let keyIssues

beforeEach(async () => {
  keyIssues = await KeyIssues.create({ keyIssueName: 'test', keyIssueCode: 'test', keyIssueDescription: 'test', themeId: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = keyIssues.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(keyIssues.id)
    expect(view.keyIssueName).toBe(keyIssues.keyIssueName)
    expect(view.keyIssueCode).toBe(keyIssues.keyIssueCode)
    expect(view.keyIssueDescription).toBe(keyIssues.keyIssueDescription)
    expect(view.themeId).toBe(keyIssues.themeId)
    expect(view.status).toBe(keyIssues.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = keyIssues.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(keyIssues.id)
    expect(view.keyIssueName).toBe(keyIssues.keyIssueName)
    expect(view.keyIssueCode).toBe(keyIssues.keyIssueCode)
    expect(view.keyIssueDescription).toBe(keyIssues.keyIssueDescription)
    expect(view.themeId).toBe(keyIssues.themeId)
    expect(view.status).toBe(keyIssues.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
