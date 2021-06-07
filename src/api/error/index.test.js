import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Error } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, error

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  error = await Error.create({ createdBy: user })
})

test('POST /errors 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, errorType: 'test', errorBucket: 'test', errorDefenition: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.errorType).toEqual('test')
  expect(body.errorBucket).toEqual('test')
  expect(body.errorDefenition).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /errors 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /errors 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /errors 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /errors/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${error.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(error.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /errors/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${error.id}`)
  expect(status).toBe(401)
})

test('GET /errors/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /errors/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${error.id}`)
    .send({ access_token: userSession, errorType: 'test', errorBucket: 'test', errorDefenition: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(error.id)
  expect(body.errorType).toEqual('test')
  expect(body.errorBucket).toEqual('test')
  expect(body.errorDefenition).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /errors/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${error.id}`)
    .send({ access_token: anotherSession, errorType: 'test', errorBucket: 'test', errorDefenition: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /errors/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${error.id}`)
  expect(status).toBe(401)
})

test('PUT /errors/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, errorType: 'test', errorBucket: 'test', errorDefenition: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /errors/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${error.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /errors/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${error.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /errors/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${error.id}`)
  expect(status).toBe(401)
})

test('DELETE /errors/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
