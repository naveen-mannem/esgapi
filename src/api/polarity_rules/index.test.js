import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { PolarityRules } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, polarityRules

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  polarityRules = await PolarityRules.create({ createdBy: user })
})

test('POST /polarity_rules 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, polarityName: 'test', polarityValue: 'test', condition: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.polarityName).toEqual('test')
  expect(body.polarityValue).toEqual('test')
  expect(body.condition).toEqual('test')
  expect(body.datapointId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /polarity_rules 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /polarity_rules 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /polarity_rules 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /polarity_rules/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${polarityRules.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(polarityRules.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /polarity_rules/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${polarityRules.id}`)
  expect(status).toBe(401)
})

test('GET /polarity_rules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /polarity_rules/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${polarityRules.id}`)
    .send({ access_token: userSession, polarityName: 'test', polarityValue: 'test', condition: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(polarityRules.id)
  expect(body.polarityName).toEqual('test')
  expect(body.polarityValue).toEqual('test')
  expect(body.condition).toEqual('test')
  expect(body.datapointId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /polarity_rules/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${polarityRules.id}`)
    .send({ access_token: anotherSession, polarityName: 'test', polarityValue: 'test', condition: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /polarity_rules/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${polarityRules.id}`)
  expect(status).toBe(401)
})

test('PUT /polarity_rules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, polarityName: 'test', polarityValue: 'test', condition: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /polarity_rules/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${polarityRules.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /polarity_rules/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${polarityRules.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /polarity_rules/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${polarityRules.id}`)
  expect(status).toBe(401)
})

test('DELETE /polarity_rules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
