import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { PolarityRule } from '.'

const app = () => express(apiRoot, routes)

let polarityRule

beforeEach(async () => {
  polarityRule = await PolarityRule.create({})
})

test('POST /polarityRule 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, polarityName: 'test', polarityValue: 'test', condition: 'test', datapointId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.polarityName).toEqual('test')
  expect(body.polarityValue).toEqual('test')
  expect(body.condition).toEqual('test')
  expect(body.datapointId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /polarityRule 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /polarityRule 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /polarityRule 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /polarityRule/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${polarityRule.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(polarityRule.id)
})

test('GET /polarityRule/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${polarityRule.id}`)
  expect(status).toBe(401)
})

test('GET /polarityRule/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /polarityRule/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${polarityRule.id}`)
    .send({ access_token: masterKey, polarityName: 'test', polarityValue: 'test', condition: 'test', datapointId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(polarityRule.id)
  expect(body.polarityName).toEqual('test')
  expect(body.polarityValue).toEqual('test')
  expect(body.condition).toEqual('test')
  expect(body.datapointId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /polarityRule/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${polarityRule.id}`)
  expect(status).toBe(401)
})

test('PUT /polarityRule/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, polarityName: 'test', polarityValue: 'test', condition: 'test', datapointId: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /polarityRule/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${polarityRule.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /polarityRule/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${polarityRule.id}`)
  expect(status).toBe(401)
})

test('DELETE /polarityRule/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
