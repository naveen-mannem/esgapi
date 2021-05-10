import { KmpMatrixDataPoints } from '.'

let kmpMatrixDataPoints

beforeEach(async () => {
  kmpMatrixDataPoints = await KmpMatrixDataPoints.create({ kmpId: 'test', dpCodeId: 'test', response: 'test', year: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = kmpMatrixDataPoints.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(kmpMatrixDataPoints.id)
    expect(view.kmpId).toBe(kmpMatrixDataPoints.kmpId)
    expect(view.dpCodeId).toBe(kmpMatrixDataPoints.dpCodeId)
    expect(view.response).toBe(kmpMatrixDataPoints.response)
    expect(view.year).toBe(kmpMatrixDataPoints.year)
    expect(view.status).toBe(kmpMatrixDataPoints.status)
    expect(view.createdAt).toBe(kmpMatrixDataPoints.createdAt)
    expect(view.updatedAt).toBe(kmpMatrixDataPoints.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = kmpMatrixDataPoints.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(kmpMatrixDataPoints.id)
    expect(view.kmpId).toBe(kmpMatrixDataPoints.kmpId)
    expect(view.dpCodeId).toBe(kmpMatrixDataPoints.dpCodeId)
    expect(view.response).toBe(kmpMatrixDataPoints.response)
    expect(view.year).toBe(kmpMatrixDataPoints.year)
    expect(view.status).toBe(kmpMatrixDataPoints.status)
    expect(view.createdAt).toBe(kmpMatrixDataPoints.createdAt)
    expect(view.updatedAt).toBe(kmpMatrixDataPoints.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
