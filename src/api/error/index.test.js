import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Error } from '.'

const app = () => express(apiRoot, routes)

let error

beforeEach(async () => {
  error = await Error.create({})
})

test('POST /error 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, errorTypeName: 'test', errorBucket: 'test', errorDefinition: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.errorTypeName).toEqual('test')
  expect(body.errorBucket).toEqual('test')
  expect(body.errorDefinition).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /error 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /error 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /error 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /error/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${error.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(error.id)
})

test('GET /error/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${error.id}`)
  expect(status).toBe(401)
})

test('GET /error/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /error/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${error.id}`)
    .send({ access_token: masterKey, errorTypeName: 'test', errorBucket: 'test', errorDefinition: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(error.id)
  expect(body.errorTypeName).toEqual('test')
  expect(body.errorBucket).toEqual('test')
  expect(body.errorDefinition).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /error/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${error.id}`)
  expect(status).toBe(401)
})

test('PUT /error/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, errorTypeName: 'test', errorBucket: 'test', errorDefinition: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /error/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${error.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /error/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${error.id}`)
  expect(status).toBe(401)
})

test('DELETE /error/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
