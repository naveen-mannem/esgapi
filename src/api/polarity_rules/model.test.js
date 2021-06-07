import { PolarityRules } from '.'
import { User } from '../user'

let user, polarityRules

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  polarityRules = await PolarityRules.create({ createdBy: user, polarityName: 'test', polarityValue: 'test', condition: 'test', datapointId: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = polarityRules.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(polarityRules.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.polarityName).toBe(polarityRules.polarityName)
    expect(view.polarityValue).toBe(polarityRules.polarityValue)
    expect(view.condition).toBe(polarityRules.condition)
    expect(view.datapointId).toBe(polarityRules.datapointId)
    expect(view.status).toBe(polarityRules.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = polarityRules.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(polarityRules.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.polarityName).toBe(polarityRules.polarityName)
    expect(view.polarityValue).toBe(polarityRules.polarityValue)
    expect(view.condition).toBe(polarityRules.condition)
    expect(view.datapointId).toBe(polarityRules.datapointId)
    expect(view.status).toBe(polarityRules.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
