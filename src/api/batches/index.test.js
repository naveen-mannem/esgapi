import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Batches } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, batches

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  batches = await Batches.create({ createdBy: user })
})

test('POST /batches 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, batchName: 'test', batchSLA: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.batchName).toEqual('test')
  expect(body.batchSLA).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /batches 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /batches 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /batches 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /batches/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${batches.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(batches.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /batches/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${batches.id}`)
  expect(status).toBe(401)
})

test('GET /batches/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /batches/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${batches.id}`)
    .send({ access_token: userSession, batchName: 'test', batchSLA: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(batches.id)
  expect(body.batchName).toEqual('test')
  expect(body.batchSLA).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /batches/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${batches.id}`)
    .send({ access_token: anotherSession, batchName: 'test', batchSLA: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /batches/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${batches.id}`)
  expect(status).toBe(401)
})

test('PUT /batches/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, batchName: 'test', batchSLA: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /batches/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${batches.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /batches/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${batches.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /batches/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${batches.id}`)
  expect(status).toBe(401)
})

test('DELETE /batches/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
