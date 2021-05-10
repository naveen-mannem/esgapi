import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { GroupAnalyst } from '.'

const app = () => express(apiRoot, routes)

let groupAnalyst

beforeEach(async () => {
  groupAnalyst = await GroupAnalyst.create({})
})

test('POST /groupAnalyst 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, userId: 'test', groupId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.userId).toEqual('test')
  expect(body.groupId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /groupAnalyst 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groupAnalyst 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /groupAnalyst 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groupAnalyst/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${groupAnalyst.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(groupAnalyst.id)
})

test('GET /groupAnalyst/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${groupAnalyst.id}`)
  expect(status).toBe(401)
})

test('GET /groupAnalyst/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /groupAnalyst/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${groupAnalyst.id}`)
    .send({ access_token: masterKey, userId: 'test', groupId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(groupAnalyst.id)
  expect(body.userId).toEqual('test')
  expect(body.groupId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /groupAnalyst/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${groupAnalyst.id}`)
  expect(status).toBe(401)
})

test('PUT /groupAnalyst/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, userId: 'test', groupId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /groupAnalyst/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groupAnalyst.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /groupAnalyst/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groupAnalyst.id}`)
  expect(status).toBe(401)
})

test('DELETE /groupAnalyst/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
