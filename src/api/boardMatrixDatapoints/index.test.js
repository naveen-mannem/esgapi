import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { BoardMatrixDatapoints } from '.'

const app = () => express(apiRoot, routes)

let boardMatrixDatapoints

beforeEach(async () => {
  boardMatrixDatapoints = await BoardMatrixDatapoints.create({})
})

test('POST /boardMatrixDatapoints 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, dpCodeId: 'test', boardMemberId: 'test', year: 'test', response: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.dpCodeId).toEqual('test')
  expect(body.boardMemberId).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.response).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /boardMatrixDatapoints 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /boardMatrixDatapoints 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /boardMatrixDatapoints 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /boardMatrixDatapoints/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${boardMatrixDatapoints.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(boardMatrixDatapoints.id)
})

test('GET /boardMatrixDatapoints/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${boardMatrixDatapoints.id}`)
  expect(status).toBe(401)
})

test('GET /boardMatrixDatapoints/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /boardMatrixDatapoints/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${boardMatrixDatapoints.id}`)
    .send({ access_token: masterKey, dpCodeId: 'test', boardMemberId: 'test', year: 'test', response: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(boardMatrixDatapoints.id)
  expect(body.dpCodeId).toEqual('test')
  expect(body.boardMemberId).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.response).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /boardMatrixDatapoints/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${boardMatrixDatapoints.id}`)
  expect(status).toBe(401)
})

test('PUT /boardMatrixDatapoints/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, dpCodeId: 'test', boardMemberId: 'test', year: 'test', response: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /boardMatrixDatapoints/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${boardMatrixDatapoints.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /boardMatrixDatapoints/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${boardMatrixDatapoints.id}`)
  expect(status).toBe(401)
})

test('DELETE /boardMatrixDatapoints/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
