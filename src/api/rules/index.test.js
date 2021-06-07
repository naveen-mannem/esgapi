import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Rules } from '.'

const app = () => express(apiRoot, routes)

let userSession, rules

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  rules = await Rules.create({})
})

test('POST /rules 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, methodName: 'test', methodType: 'test', criteria: 'test', parameter: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.methodName).toEqual('test')
  expect(body.methodType).toEqual('test')
  expect(body.criteria).toEqual('test')
  expect(body.parameter).toEqual('test')
  expect(body.datapointId).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /rules 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /rules 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /rules 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /rules/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${rules.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(rules.id)
})

test('GET /rules/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${rules.id}`)
  expect(status).toBe(401)
})

test('GET /rules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /rules/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${rules.id}`)
    .send({ access_token: userSession, methodName: 'test', methodType: 'test', criteria: 'test', parameter: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(rules.id)
  expect(body.methodName).toEqual('test')
  expect(body.methodType).toEqual('test')
  expect(body.criteria).toEqual('test')
  expect(body.parameter).toEqual('test')
  expect(body.datapointId).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /rules/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${rules.id}`)
  expect(status).toBe(401)
})

test('PUT /rules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, methodName: 'test', methodType: 'test', criteria: 'test', parameter: 'test', datapointId: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /rules/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${rules.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /rules/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${rules.id}`)
  expect(status).toBe(401)
})

test('DELETE /rules/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
