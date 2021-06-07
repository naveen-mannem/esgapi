import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Validations } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, validations

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  validations = await Validations.create({ createdBy: user })
})

test('POST /validations 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, datapointId: 'test', validationRule: 'test', rule: 'test', dependantCode: 'test', condition: 'test', criteria: 'test', validationAlert: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.datapointId).toEqual('test')
  expect(body.validationRule).toEqual('test')
  expect(body.rule).toEqual('test')
  expect(body.dependantCode).toEqual('test')
  expect(body.condition).toEqual('test')
  expect(body.criteria).toEqual('test')
  expect(body.validationAlert).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /validations 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /validations 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /validations 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /validations/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${validations.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(validations.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /validations/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${validations.id}`)
  expect(status).toBe(401)
})

test('GET /validations/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /validations/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${validations.id}`)
    .send({ access_token: userSession, datapointId: 'test', validationRule: 'test', rule: 'test', dependantCode: 'test', condition: 'test', criteria: 'test', validationAlert: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(validations.id)
  expect(body.datapointId).toEqual('test')
  expect(body.validationRule).toEqual('test')
  expect(body.rule).toEqual('test')
  expect(body.dependantCode).toEqual('test')
  expect(body.condition).toEqual('test')
  expect(body.criteria).toEqual('test')
  expect(body.validationAlert).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /validations/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${validations.id}`)
    .send({ access_token: anotherSession, datapointId: 'test', validationRule: 'test', rule: 'test', dependantCode: 'test', condition: 'test', criteria: 'test', validationAlert: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /validations/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${validations.id}`)
  expect(status).toBe(401)
})

test('PUT /validations/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, datapointId: 'test', validationRule: 'test', rule: 'test', dependantCode: 'test', condition: 'test', criteria: 'test', validationAlert: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /validations/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${validations.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /validations/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${validations.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /validations/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${validations.id}`)
  expect(status).toBe(401)
})

test('DELETE /validations/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
