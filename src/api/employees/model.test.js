import { Employees } from '.'
import { User } from '../user'

let user, employees

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  employees = await Employees.create({ createdBy: user, userId: 'test', firstName: 'test', middleName: 'test', lastName: 'test', panNumber: 'test', aadhaarNumber: 'test', bankAccountNumber: 'test', bankIFSCCode: 'test', accountHolderName: 'test', pancardUrl: 'test', aadhaarUrl: 'test', cancelledChequeUrl: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = employees.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(employees.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.userId).toBe(employees.userId)
    expect(view.firstName).toBe(employees.firstName)
    expect(view.middleName).toBe(employees.middleName)
    expect(view.lastName).toBe(employees.lastName)
    expect(view.panNumber).toBe(employees.panNumber)
    expect(view.aadhaarNumber).toBe(employees.aadhaarNumber)
    expect(view.bankAccountNumber).toBe(employees.bankAccountNumber)
    expect(view.bankIFSCCode).toBe(employees.bankIFSCCode)
    expect(view.accountHolderName).toBe(employees.accountHolderName)
    expect(view.pancardUrl).toBe(employees.pancardUrl)
    expect(view.aadhaarUrl).toBe(employees.aadhaarUrl)
    expect(view.cancelledChequeUrl).toBe(employees.cancelledChequeUrl)
    expect(view.status).toBe(employees.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = employees.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(employees.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.userId).toBe(employees.userId)
    expect(view.firstName).toBe(employees.firstName)
    expect(view.middleName).toBe(employees.middleName)
    expect(view.lastName).toBe(employees.lastName)
    expect(view.panNumber).toBe(employees.panNumber)
    expect(view.aadhaarNumber).toBe(employees.aadhaarNumber)
    expect(view.bankAccountNumber).toBe(employees.bankAccountNumber)
    expect(view.bankIFSCCode).toBe(employees.bankIFSCCode)
    expect(view.accountHolderName).toBe(employees.accountHolderName)
    expect(view.pancardUrl).toBe(employees.pancardUrl)
    expect(view.aadhaarUrl).toBe(employees.aadhaarUrl)
    expect(view.cancelledChequeUrl).toBe(employees.cancelledChequeUrl)
    expect(view.status).toBe(employees.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
