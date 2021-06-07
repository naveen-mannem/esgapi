import { BoardMembers } from '.'
import { User } from '../user'

let user, boardMembers

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  boardMembers = await BoardMembers.create({ createdBy: user, companyId: 'test', boardMemberName: 'test', memberStatus: 'test', year: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = boardMembers.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(boardMembers.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.companyId).toBe(boardMembers.companyId)
    expect(view.boardMemberName).toBe(boardMembers.boardMemberName)
    expect(view.memberStatus).toBe(boardMembers.memberStatus)
    expect(view.year).toBe(boardMembers.year)
    expect(view.status).toBe(boardMembers.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = boardMembers.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(boardMembers.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.companyId).toBe(boardMembers.companyId)
    expect(view.boardMemberName).toBe(boardMembers.boardMemberName)
    expect(view.memberStatus).toBe(boardMembers.memberStatus)
    expect(view.year).toBe(boardMembers.year)
    expect(view.status).toBe(boardMembers.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
