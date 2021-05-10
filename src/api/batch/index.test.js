import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Batch } from '.'

const app = () => express(apiRoot, routes)

let batch

beforeEach(async () => {
  batch = await Batch.create({})
})

test('POST /batch 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, batchName: 'test', batchSLA: 'test', status: 'test', createdBy: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.batchName).toEqual('test')
  expect(body.batchSLA).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdBy).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /batch 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /batch 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /batch 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /batch/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${batch.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(batch.id)
})

test('GET /batch/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${batch.id}`)
  expect(status).toBe(401)
})

test('GET /batch/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /batch/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${batch.id}`)
    .send({ access_token: masterKey, batchName: 'test', batchSLA: 'test', status: 'test', createdBy: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(batch.id)
  expect(body.batchName).toEqual('test')
  expect(body.batchSLA).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdBy).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /batch/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${batch.id}`)
  expect(status).toBe(401)
})

test('PUT /batch/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, batchName: 'test', batchSLA: 'test', status: 'test', createdBy: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /batch/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${batch.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /batch/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${batch.id}`)
  expect(status).toBe(401)
})

test('DELETE /batch/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
