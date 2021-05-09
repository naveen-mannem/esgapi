import { Rules } from '.'

let rules

beforeEach(async () => {
  rules = await Rules.create({ methodName: 'test', methodType: 'test', criteria: 'test', parameter: 'test', datapointId: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = rules.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(rules.id)
    expect(view.methodName).toBe(rules.methodName)
    expect(view.methodType).toBe(rules.methodType)
    expect(view.criteria).toBe(rules.criteria)
    expect(view.parameter).toBe(rules.parameter)
    expect(view.datapointId).toBe(rules.datapointId)
    expect(view.status).toBe(rules.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = rules.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(rules.id)
    expect(view.methodName).toBe(rules.methodName)
    expect(view.methodType).toBe(rules.methodType)
    expect(view.criteria).toBe(rules.criteria)
    expect(view.parameter).toBe(rules.parameter)
    expect(view.datapointId).toBe(rules.datapointId)
    expect(view.status).toBe(rules.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
