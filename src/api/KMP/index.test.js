import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Kmp } from '.'

const app = () => express(apiRoot, routes)

let kmp

beforeEach(async () => {
  kmp = await Kmp.create({})
})

test('POST /KMP 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, companyId: 'test', kmpMemberName: 'test', memberStatus: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.companyId).toEqual('test')
  expect(body.kmpMemberName).toEqual('test')
  expect(body.memberStatus).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /KMP 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /KMP 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /KMP 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /KMP/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${kmp.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(kmp.id)
})

test('GET /KMP/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${kmp.id}`)
  expect(status).toBe(401)
})

test('GET /KMP/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /KMP/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${kmp.id}`)
    .send({ access_token: masterKey, companyId: 'test', kmpMemberName: 'test', memberStatus: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(kmp.id)
  expect(body.companyId).toEqual('test')
  expect(body.kmpMemberName).toEqual('test')
  expect(body.memberStatus).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /KMP/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${kmp.id}`)
  expect(status).toBe(401)
})

test('PUT /KMP/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, companyId: 'test', kmpMemberName: 'test', memberStatus: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /KMP/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kmp.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /KMP/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kmp.id}`)
  expect(status).toBe(401)
})

test('DELETE /KMP/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
