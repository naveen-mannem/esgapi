import { PolarityRule } from '.'
import { User } from '../user'

let user, polarityRule

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  polarityRule = await PolarityRule.create({ createdAt: user, polarityName: 'test', polarityValue: 'test', condition: 'test', dataPointId: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = polarityRule.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(polarityRule.id)
    expect(typeof view.createdAt).toBe('object')
    expect(view.createdAt.id).toBe(user.id)
    expect(view.polarityName).toBe(polarityRule.polarityName)
    expect(view.polarityValue).toBe(polarityRule.polarityValue)
    expect(view.condition).toBe(polarityRule.condition)
    expect(view.dataPointId).toBe(polarityRule.dataPointId)
    expect(view.status).toBe(polarityRule.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = polarityRule.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(polarityRule.id)
    expect(typeof view.createdAt).toBe('object')
    expect(view.createdAt.id).toBe(user.id)
    expect(view.polarityName).toBe(polarityRule.polarityName)
    expect(view.polarityValue).toBe(polarityRule.polarityValue)
    expect(view.condition).toBe(polarityRule.condition)
    expect(view.dataPointId).toBe(polarityRule.dataPointId)
    expect(view.status).toBe(polarityRule.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
