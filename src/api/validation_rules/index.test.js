import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { ValidationRules } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, validationRules

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  validationRules = await ValidationRules.create({ createdBy: user })
})

test('POST /validation_rules 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, ruleName: 'test', condition: 'test', criteria: 'test', minimumValue: 'test', maximumValue: 'test', dependantDPCodes: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.ruleName).toEqual('test')
  expect(body.condition).toEqual('test')
  expect(body.criteria).toEqual('test')
  expect(body.minimumValue).toEqual('test')
  expect(body.maximumValue).toEqual('test')
  expect(body.dependantDPCodes).toEqual('test')
  expect(body.datapointId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /validation_rules 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /validation_rules 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /validation_rules 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /validation_rules/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${validationRules.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(validationRules.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /validation_rules/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${validationRules.id}`)
  expect(status).toBe(401)
})

test('GET /validation_rules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /validation_rules/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${validationRules.id}`)
    .send({ access_token: userSession, ruleName: 'test', condition: 'test', criteria: 'test', minimumValue: 'test', maximumValue: 'test', dependantDPCodes: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(validationRules.id)
  expect(body.ruleName).toEqual('test')
  expect(body.condition).toEqual('test')
  expect(body.criteria).toEqual('test')
  expect(body.minimumValue).toEqual('test')
  expect(body.maximumValue).toEqual('test')
  expect(body.dependantDPCodes).toEqual('test')
  expect(body.datapointId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /validation_rules/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${validationRules.id}`)
    .send({ access_token: anotherSession, ruleName: 'test', condition: 'test', criteria: 'test', minimumValue: 'test', maximumValue: 'test', dependantDPCodes: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /validation_rules/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${validationRules.id}`)
  expect(status).toBe(401)
})

test('PUT /validation_rules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, ruleName: 'test', condition: 'test', criteria: 'test', minimumValue: 'test', maximumValue: 'test', dependantDPCodes: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /validation_rules/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${validationRules.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /validation_rules/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${validationRules.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /validation_rules/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${validationRules.id}`)
  expect(status).toBe(401)
})

test('DELETE /validation_rules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
