import { Batch } from '.'

let batch

beforeEach(async () => {
  batch = await Batch.create({ batchName: 'test', batchSLA: 'test', status: 'test', createdBy: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = batch.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(batch.id)
    expect(view.batchName).toBe(batch.batchName)
    expect(view.batchSLA).toBe(batch.batchSLA)
    expect(view.status).toBe(batch.status)
    expect(view.createdBy).toBe(batch.createdBy)
    expect(view.createdAt).toBe(batch.createdAt)
    expect(view.updatedAt).toBe(batch.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = batch.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(batch.id)
    expect(view.batchName).toBe(batch.batchName)
    expect(view.batchSLA).toBe(batch.batchSLA)
    expect(view.status).toBe(batch.status)
    expect(view.createdBy).toBe(batch.createdBy)
    expect(view.createdAt).toBe(batch.createdAt)
    expect(view.updatedAt).toBe(batch.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
