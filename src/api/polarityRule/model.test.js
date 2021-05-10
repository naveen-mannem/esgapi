import { PolarityRule } from '.'

let polarityRule

beforeEach(async () => {
  polarityRule = await PolarityRule.create({ polarityName: 'test', polarityValue: 'test', condition: 'test', datapointId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = polarityRule.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(polarityRule.id)
    expect(view.polarityName).toBe(polarityRule.polarityName)
    expect(view.polarityValue).toBe(polarityRule.polarityValue)
    expect(view.condition).toBe(polarityRule.condition)
    expect(view.datapointId).toBe(polarityRule.datapointId)
    expect(view.status).toBe(polarityRule.status)
    expect(view.createdAt).toBe(polarityRule.createdAt)
    expect(view.updatedAt).toBe(polarityRule.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = polarityRule.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(polarityRule.id)
    expect(view.polarityName).toBe(polarityRule.polarityName)
    expect(view.polarityValue).toBe(polarityRule.polarityValue)
    expect(view.condition).toBe(polarityRule.condition)
    expect(view.datapointId).toBe(polarityRule.datapointId)
    expect(view.status).toBe(polarityRule.status)
    expect(view.createdAt).toBe(polarityRule.createdAt)
    expect(view.updatedAt).toBe(polarityRule.updatedAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
