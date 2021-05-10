import { BoardMembers } from '.'

let boardMembers

beforeEach(async () => {
  boardMembers = await BoardMembers.create({ companyId: 'test', boardMemberName: 'test', memberStatus: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = boardMembers.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(boardMembers.id)
    expect(view.companyId).toBe(boardMembers.companyId)
    expect(view.boardMemberName).toBe(boardMembers.boardMemberName)
    expect(view.memberStatus).toBe(boardMembers.memberStatus)
    expect(view.status).toBe(boardMembers.status)
    expect(view.createdAt).toBe(boardMembers.createdAt)
    expect(view.updatedAt).toBe(boardMembers.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = boardMembers.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(boardMembers.id)
    expect(view.companyId).toBe(boardMembers.companyId)
    expect(view.boardMemberName).toBe(boardMembers.boardMemberName)
    expect(view.memberStatus).toBe(boardMembers.memberStatus)
    expect(view.status).toBe(boardMembers.status)
    expect(view.createdAt).toBe(boardMembers.createdAt)
    expect(view.updatedAt).toBe(boardMembers.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
