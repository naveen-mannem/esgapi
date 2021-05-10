import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { ErrorDetails } from '.'

const app = () => express(apiRoot, routes)

let errorDetails

beforeEach(async () => {
  errorDetails = await ErrorDetails.create({})
})

test('POST /errorDetails 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, errorTypeId: 'test', taskId: 'test', loggedBy: 'test', comments: 'test', errorLoggedDate: 'test', errorStatus: 'test', standAlonId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.errorTypeId).toEqual('test')
  expect(body.taskId).toEqual('test')
  expect(body.loggedBy).toEqual('test')
  expect(body.comments).toEqual('test')
  expect(body.errorLoggedDate).toEqual('test')
  expect(body.errorStatus).toEqual('test')
  expect(body.standAlonId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /errorDetails 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /errorDetails 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /errorDetails 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /errorDetails/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${errorDetails.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(errorDetails.id)
})

test('GET /errorDetails/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${errorDetails.id}`)
  expect(status).toBe(401)
})

test('GET /errorDetails/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /errorDetails/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${errorDetails.id}`)
    .send({ access_token: masterKey, errorTypeId: 'test', taskId: 'test', loggedBy: 'test', comments: 'test', errorLoggedDate: 'test', errorStatus: 'test', standAlonId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(errorDetails.id)
  expect(body.errorTypeId).toEqual('test')
  expect(body.taskId).toEqual('test')
  expect(body.loggedBy).toEqual('test')
  expect(body.comments).toEqual('test')
  expect(body.errorLoggedDate).toEqual('test')
  expect(body.errorStatus).toEqual('test')
  expect(body.standAlonId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /errorDetails/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${errorDetails.id}`)
  expect(status).toBe(401)
})

test('PUT /errorDetails/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, errorTypeId: 'test', taskId: 'test', loggedBy: 'test', comments: 'test', errorLoggedDate: 'test', errorStatus: 'test', standAlonId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /errorDetails/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${errorDetails.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /errorDetails/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${errorDetails.id}`)
  expect(status).toBe(401)
})

test('DELETE /errorDetails/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
