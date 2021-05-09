import { AverageSd } from '.'

let averageSd

beforeEach(async () => {
  averageSd = await AverageSd.create({ companyId: 'test', year: 'test', stdDeviation: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = averageSd.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(averageSd.id)
    expect(view.companyId).toBe(averageSd.companyId)
    expect(view.year).toBe(averageSd.year)
    expect(view.stdDeviation).toBe(averageSd.stdDeviation)
    expect(view.status).toBe(averageSd.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = averageSd.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(averageSd.id)
    expect(view.companyId).toBe(averageSd.companyId)
    expect(view.year).toBe(averageSd.year)
    expect(view.stdDeviation).toBe(averageSd.stdDeviation)
    expect(view.status).toBe(averageSd.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
