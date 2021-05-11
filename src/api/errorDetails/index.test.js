import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { ErrorDetails } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, errorDetails

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  errorDetails = await ErrorDetails.create({ createdBy: user })
})

test('POST /errorDetails 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, errorTypeId: 'test', taskId: 'test', loggedBy: 'test', comments: 'test', errorLoggedDate: 'test', errorStatus: 'test', standaloneId: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.errorTypeId).toEqual('test')
  expect(body.taskId).toEqual('test')
  expect(body.loggedBy).toEqual('test')
  expect(body.comments).toEqual('test')
  expect(body.errorLoggedDate).toEqual('test')
  expect(body.errorStatus).toEqual('test')
  expect(body.standaloneId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /errorDetails 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /errorDetails 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /errorDetails 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /errorDetails/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${errorDetails.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(errorDetails.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /errorDetails/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${errorDetails.id}`)
  expect(status).toBe(401)
})

test('GET /errorDetails/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /errorDetails/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${errorDetails.id}`)
    .send({ access_token: userSession, errorTypeId: 'test', taskId: 'test', loggedBy: 'test', comments: 'test', errorLoggedDate: 'test', errorStatus: 'test', standaloneId: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(errorDetails.id)
  expect(body.errorTypeId).toEqual('test')
  expect(body.taskId).toEqual('test')
  expect(body.loggedBy).toEqual('test')
  expect(body.comments).toEqual('test')
  expect(body.errorLoggedDate).toEqual('test')
  expect(body.errorStatus).toEqual('test')
  expect(body.standaloneId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /errorDetails/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${errorDetails.id}`)
    .send({ access_token: anotherSession, errorTypeId: 'test', taskId: 'test', loggedBy: 'test', comments: 'test', errorLoggedDate: 'test', errorStatus: 'test', standaloneId: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /errorDetails/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${errorDetails.id}`)
  expect(status).toBe(401)
})

test('PUT /errorDetails/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, errorTypeId: 'test', taskId: 'test', loggedBy: 'test', comments: 'test', errorLoggedDate: 'test', errorStatus: 'test', standaloneId: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /errorDetails/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${errorDetails.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /errorDetails/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${errorDetails.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /errorDetails/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${errorDetails.id}`)
  expect(status).toBe(401)
})

test('DELETE /errorDetails/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
