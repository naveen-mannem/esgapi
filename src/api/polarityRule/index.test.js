import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { PolarityRule } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, polarityRule

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  polarityRule = await PolarityRule.create({ createdBy: user })
})

test('POST /polarityRules 201 (user)', async () => {
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

test('POST /polarityRules 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /polarityRules 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /polarityRules 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /polarityRules/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${polarityRule.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(polarityRule.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /polarityRules/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${polarityRule.id}`)
  expect(status).toBe(401)
})

test('GET /polarityRules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /polarityRules/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${polarityRule.id}`)
    .send({ access_token: userSession, polarityName: 'test', polarityValue: 'test', condition: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(polarityRule.id)
  expect(body.polarityName).toEqual('test')
  expect(body.polarityValue).toEqual('test')
  expect(body.condition).toEqual('test')
  expect(body.datapointId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /polarityRules/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${polarityRule.id}`)
    .send({ access_token: anotherSession, polarityName: 'test', polarityValue: 'test', condition: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /polarityRules/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${polarityRule.id}`)
  expect(status).toBe(401)
})

test('PUT /polarityRules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, polarityName: 'test', polarityValue: 'test', condition: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /polarityRules/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${polarityRule.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /polarityRules/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${polarityRule.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /polarityRules/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${polarityRule.id}`)
  expect(status).toBe(401)
})

test('DELETE /polarityRules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
