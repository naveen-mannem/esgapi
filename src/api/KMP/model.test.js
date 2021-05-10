import { Kmp } from '.'

let kmp

beforeEach(async () => {
  kmp = await Kmp.create({ companyId: 'test', kmpMemberName: 'test', memberStatus: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = kmp.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(kmp.id)
    expect(view.companyId).toBe(kmp.companyId)
    expect(view.kmpMemberName).toBe(kmp.kmpMemberName)
    expect(view.memberStatus).toBe(kmp.memberStatus)
    expect(view.createdAt).toBe(kmp.createdAt)
    expect(view.updatedAt).toBe(kmp.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = kmp.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(kmp.id)
    expect(view.companyId).toBe(kmp.companyId)
    expect(view.kmpMemberName).toBe(kmp.kmpMemberName)
    expect(view.memberStatus).toBe(kmp.memberStatus)
    expect(view.createdAt).toBe(kmp.createdAt)
    expect(view.updatedAt).toBe(kmp.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
