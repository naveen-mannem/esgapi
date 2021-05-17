import { Kmp } from '.'
import { User } from '../user'

let user, kmp

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  kmp = await Kmp.create({ createdBy: user, companyId: 'test', kmpMemberName: 'test', memberStatus: 'test', year: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = kmp.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(kmp.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.companyId).toBe(kmp.companyId)
    expect(view.kmpMemberName).toBe(kmp.kmpMemberName)
    expect(view.memberStatus).toBe(kmp.memberStatus)
    expect(view.year).toBe(kmp.year)
    expect(view.status).toBe(kmp.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = kmp.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(kmp.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.companyId).toBe(kmp.companyId)
    expect(view.kmpMemberName).toBe(kmp.kmpMemberName)
    expect(view.memberStatus).toBe(kmp.memberStatus)
    expect(view.year).toBe(kmp.year)
    expect(view.status).toBe(kmp.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
