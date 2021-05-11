import { KmpMatrixDataPoints } from '.'
import { User } from '../user'

let user, kmpMatrixDataPoints

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  kmpMatrixDataPoints = await KmpMatrixDataPoints.create({ createdBy: user, kmpId: 'test', dpCodeId: 'test', response: 'test', year: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = kmpMatrixDataPoints.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(kmpMatrixDataPoints.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.kmpId).toBe(kmpMatrixDataPoints.kmpId)
    expect(view.dpCodeId).toBe(kmpMatrixDataPoints.dpCodeId)
    expect(view.response).toBe(kmpMatrixDataPoints.response)
    expect(view.year).toBe(kmpMatrixDataPoints.year)
    expect(view.status).toBe(kmpMatrixDataPoints.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = kmpMatrixDataPoints.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(kmpMatrixDataPoints.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.kmpId).toBe(kmpMatrixDataPoints.kmpId)
    expect(view.dpCodeId).toBe(kmpMatrixDataPoints.dpCodeId)
    expect(view.response).toBe(kmpMatrixDataPoints.response)
    expect(view.year).toBe(kmpMatrixDataPoints.year)
    expect(view.status).toBe(kmpMatrixDataPoints.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
