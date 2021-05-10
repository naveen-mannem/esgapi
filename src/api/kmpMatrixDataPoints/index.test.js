import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { KmpMatrixDataPoints } from '.'

const app = () => express(apiRoot, routes)

let kmpMatrixDataPoints

beforeEach(async () => {
  kmpMatrixDataPoints = await KmpMatrixDataPoints.create({})
})

test('POST /kmpMatrixDataPoints 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, kmpId: 'test', dpCodeId: 'test', response: 'test', year: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.kmpId).toEqual('test')
  expect(body.dpCodeId).toEqual('test')
  expect(body.response).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /kmpMatrixDataPoints 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /kmpMatrixDataPoints 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /kmpMatrixDataPoints 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /kmpMatrixDataPoints/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${kmpMatrixDataPoints.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(kmpMatrixDataPoints.id)
})

test('GET /kmpMatrixDataPoints/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${kmpMatrixDataPoints.id}`)
  expect(status).toBe(401)
})

test('GET /kmpMatrixDataPoints/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /kmpMatrixDataPoints/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${kmpMatrixDataPoints.id}`)
    .send({ access_token: masterKey, kmpId: 'test', dpCodeId: 'test', response: 'test', year: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(kmpMatrixDataPoints.id)
  expect(body.kmpId).toEqual('test')
  expect(body.dpCodeId).toEqual('test')
  expect(body.response).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /kmpMatrixDataPoints/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${kmpMatrixDataPoints.id}`)
  expect(status).toBe(401)
})

test('PUT /kmpMatrixDataPoints/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, kmpId: 'test', dpCodeId: 'test', response: 'test', year: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /kmpMatrixDataPoints/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kmpMatrixDataPoints.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /kmpMatrixDataPoints/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kmpMatrixDataPoints.id}`)
  expect(status).toBe(401)
})

test('DELETE /kmpMatrixDataPoints/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
