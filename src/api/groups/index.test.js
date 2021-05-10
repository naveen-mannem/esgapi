import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Groups } from '.'

const app = () => express(apiRoot, routes)

let groups

beforeEach(async () => {
  groups = await Groups.create({})
})

test('POST /groups 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, groupName: 'test', groupAdmin: 'test', batchId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.groupName).toEqual('test')
  expect(body.groupAdmin).toEqual('test')
  expect(body.batchId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /groups 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groups 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /groups 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groups/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${groups.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(groups.id)
})

test('GET /groups/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${groups.id}`)
  expect(status).toBe(401)
})

test('GET /groups/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /groups/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${groups.id}`)
    .send({ access_token: masterKey, groupName: 'test', groupAdmin: 'test', batchId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(groups.id)
  expect(body.groupName).toEqual('test')
  expect(body.groupAdmin).toEqual('test')
  expect(body.batchId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /groups/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${groups.id}`)
  expect(status).toBe(401)
})

test('PUT /groups/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, groupName: 'test', groupAdmin: 'test', batchId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /groups/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groups.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /groups/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groups.id}`)
  expect(status).toBe(401)
})

test('DELETE /groups/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
