import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { GroupQa } from '.'

const app = () => express(apiRoot, routes)

let groupQa

beforeEach(async () => {
  groupQa = await GroupQa.create({})
})

test('POST /groupQA 201 (master)', async () => {
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

test('POST /groupQA 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groupQA 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /groupQA 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groupQA/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${groupQa.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(groupQa.id)
})

test('GET /groupQA/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${groupQa.id}`)
  expect(status).toBe(401)
})

test('GET /groupQA/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /groupQA/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${groupQa.id}`)
    .send({ access_token: masterKey, userId: 'test', groupId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(groupQa.id)
  expect(body.userId).toEqual('test')
  expect(body.groupId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /groupQA/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${groupQa.id}`)
  expect(status).toBe(401)
})

test('PUT /groupQA/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, userId: 'test', groupId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /groupQA/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groupQa.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /groupQA/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groupQa.id}`)
  expect(status).toBe(401)
})

test('DELETE /groupQA/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
