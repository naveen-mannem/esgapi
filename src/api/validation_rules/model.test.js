import { ValidationRules } from '.'
import { User } from '../user'

let user, validationRules

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  validationRules = await ValidationRules.create({ createdBy: user, ruleName: 'test', condition: 'test', criteria: 'test', minimumValue: 'test', maximumValue: 'test', dependantDPCodes: 'test', datapointId: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = validationRules.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(validationRules.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.ruleName).toBe(validationRules.ruleName)
    expect(view.condition).toBe(validationRules.condition)
    expect(view.criteria).toBe(validationRules.criteria)
    expect(view.minimumValue).toBe(validationRules.minimumValue)
    expect(view.maximumValue).toBe(validationRules.maximumValue)
    expect(view.dependantDPCodes).toBe(validationRules.dependantDPCodes)
    expect(view.datapointId).toBe(validationRules.datapointId)
    expect(view.status).toBe(validationRules.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = validationRules.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(validationRules.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.ruleName).toBe(validationRules.ruleName)
    expect(view.condition).toBe(validationRules.condition)
    expect(view.criteria).toBe(validationRules.criteria)
    expect(view.minimumValue).toBe(validationRules.minimumValue)
    expect(view.maximumValue).toBe(validationRules.maximumValue)
    expect(view.dependantDPCodes).toBe(validationRules.dependantDPCodes)
    expect(view.datapointId).toBe(validationRules.datapointId)
    expect(view.status).toBe(validationRules.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
