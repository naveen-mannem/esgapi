import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Employees } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, employees

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  employees = await Employees.create({ createdBy: user })
})

test('POST /employees 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, userId: 'test', firstName: 'test', middleName: 'test', lastName: 'test', panNumber: 'test', aadhaarNumber: 'test', bankAccountNumber: 'test', bankIFSCCode: 'test', accountHolderName: 'test', pancardUrl: 'test', aadhaarUrl: 'test', cancelledChequeUrl: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.userId).toEqual('test')
  expect(body.firstName).toEqual('test')
  expect(body.middleName).toEqual('test')
  expect(body.lastName).toEqual('test')
  expect(body.panNumber).toEqual('test')
  expect(body.aadhaarNumber).toEqual('test')
  expect(body.bankAccountNumber).toEqual('test')
  expect(body.bankIFSCCode).toEqual('test')
  expect(body.accountHolderName).toEqual('test')
  expect(body.pancardUrl).toEqual('test')
  expect(body.aadhaarUrl).toEqual('test')
  expect(body.cancelledChequeUrl).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /employees 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /employees 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /employees 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /employees/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${employees.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(employees.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /employees/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${employees.id}`)
  expect(status).toBe(401)
})

test('GET /employees/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /employees/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${employees.id}`)
    .send({ access_token: userSession, userId: 'test', firstName: 'test', middleName: 'test', lastName: 'test', panNumber: 'test', aadhaarNumber: 'test', bankAccountNumber: 'test', bankIFSCCode: 'test', accountHolderName: 'test', pancardUrl: 'test', aadhaarUrl: 'test', cancelledChequeUrl: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(employees.id)
  expect(body.userId).toEqual('test')
  expect(body.firstName).toEqual('test')
  expect(body.middleName).toEqual('test')
  expect(body.lastName).toEqual('test')
  expect(body.panNumber).toEqual('test')
  expect(body.aadhaarNumber).toEqual('test')
  expect(body.bankAccountNumber).toEqual('test')
  expect(body.bankIFSCCode).toEqual('test')
  expect(body.accountHolderName).toEqual('test')
  expect(body.pancardUrl).toEqual('test')
  expect(body.aadhaarUrl).toEqual('test')
  expect(body.cancelledChequeUrl).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /employees/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${employees.id}`)
    .send({ access_token: anotherSession, userId: 'test', firstName: 'test', middleName: 'test', lastName: 'test', panNumber: 'test', aadhaarNumber: 'test', bankAccountNumber: 'test', bankIFSCCode: 'test', accountHolderName: 'test', pancardUrl: 'test', aadhaarUrl: 'test', cancelledChequeUrl: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /employees/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${employees.id}`)
  expect(status).toBe(401)
})

test('PUT /employees/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, userId: 'test', firstName: 'test', middleName: 'test', lastName: 'test', panNumber: 'test', aadhaarNumber: 'test', bankAccountNumber: 'test', bankIFSCCode: 'test', accountHolderName: 'test', pancardUrl: 'test', aadhaarUrl: 'test', cancelledChequeUrl: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /employees/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${employees.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /employees/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${employees.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /employees/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${employees.id}`)
  expect(status).toBe(401)
})

test('DELETE /employees/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
