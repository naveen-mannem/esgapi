import { Validations } from '.'
import { User } from '../user'

let user, validations

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  validations = await Validations.create({ createdBy: user, datapointId: 'test', validationRule: 'test', rule: 'test', dependantCode: 'test', condition: 'test', criteria: 'test', validationAlert: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = validations.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(validations.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.datapointId).toBe(validations.datapointId)
    expect(view.validationRule).toBe(validations.validationRule)
    expect(view.rule).toBe(validations.rule)
    expect(view.dependantCode).toBe(validations.dependantCode)
    expect(view.condition).toBe(validations.condition)
    expect(view.criteria).toBe(validations.criteria)
    expect(view.validationAlert).toBe(validations.validationAlert)
    expect(view.status).toBe(validations.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = validations.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(validations.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.datapointId).toBe(validations.datapointId)
    expect(view.validationRule).toBe(validations.validationRule)
    expect(view.rule).toBe(validations.rule)
    expect(view.dependantCode).toBe(validations.dependantCode)
    expect(view.condition).toBe(validations.condition)
    expect(view.criteria).toBe(validations.criteria)
    expect(view.validationAlert).toBe(validations.validationAlert)
    expect(view.status).toBe(validations.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
