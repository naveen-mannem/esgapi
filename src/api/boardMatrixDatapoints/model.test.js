import { BoardMatrixDatapoints } from '.'

let boardMatrixDatapoints

beforeEach(async () => {
  boardMatrixDatapoints = await BoardMatrixDatapoints.create({ dpCodeId: 'test', boardMemberId: 'test', year: 'test', response: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = boardMatrixDatapoints.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(boardMatrixDatapoints.id)
    expect(view.dpCodeId).toBe(boardMatrixDatapoints.dpCodeId)
    expect(view.boardMemberId).toBe(boardMatrixDatapoints.boardMemberId)
    expect(view.year).toBe(boardMatrixDatapoints.year)
    expect(view.response).toBe(boardMatrixDatapoints.response)
    expect(view.status).toBe(boardMatrixDatapoints.status)
    expect(view.createdAt).toBe(boardMatrixDatapoints.createdAt)
    expect(view.updatedAt).toBe(boardMatrixDatapoints.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = boardMatrixDatapoints.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(boardMatrixDatapoints.id)
    expect(view.dpCodeId).toBe(boardMatrixDatapoints.dpCodeId)
    expect(view.boardMemberId).toBe(boardMatrixDatapoints.boardMemberId)
    expect(view.year).toBe(boardMatrixDatapoints.year)
    expect(view.response).toBe(boardMatrixDatapoints.response)
    expect(view.status).toBe(boardMatrixDatapoints.status)
    expect(view.createdAt).toBe(boardMatrixDatapoints.createdAt)
    expect(view.updatedAt).toBe(boardMatrixDatapoints.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
