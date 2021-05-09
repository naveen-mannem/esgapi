import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Controversy } from '.'

const app = () => express(apiRoot, routes)

let controversy

beforeEach(async () => {
  controversy = await Controversy.create({})
})

test('POST /controversy 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, dpCodeId: 'test', companyId: 'test', year: 'test', sourceName: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', response: 'test', submittedDate: 'test', submittedBy: 'test', activeStatus: 'test', status: 'test', createdBy: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.dpCodeId).toEqual('test')
  expect(body.companyId).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.sourceName).toEqual('test')
  expect(body.sourceUrl).toEqual('test')
  expect(body.sourcePublicationDate).toEqual('test')
  expect(body.response).toEqual('test')
  expect(body.submittedDate).toEqual('test')
  expect(body.submittedBy).toEqual('test')
  expect(body.activeStatus).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdBy).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /controversy 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /controversy 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /controversy 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /controversy/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${controversy.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(controversy.id)
})

test('GET /controversy/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${controversy.id}`)
  expect(status).toBe(401)
})

test('GET /controversy/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /controversy/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${controversy.id}`)
    .send({ access_token: masterKey, dpCodeId: 'test', companyId: 'test', year: 'test', sourceName: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', response: 'test', submittedDate: 'test', submittedBy: 'test', activeStatus: 'test', status: 'test', createdBy: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(controversy.id)
  expect(body.dpCodeId).toEqual('test')
  expect(body.companyId).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.sourceName).toEqual('test')
  expect(body.sourceUrl).toEqual('test')
  expect(body.sourcePublicationDate).toEqual('test')
  expect(body.response).toEqual('test')
  expect(body.submittedDate).toEqual('test')
  expect(body.submittedBy).toEqual('test')
  expect(body.activeStatus).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdBy).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /controversy/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${controversy.id}`)
  expect(status).toBe(401)
})

test('PUT /controversy/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, dpCodeId: 'test', companyId: 'test', year: 'test', sourceName: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', response: 'test', submittedDate: 'test', submittedBy: 'test', activeStatus: 'test', status: 'test', createdBy: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /controversy/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${controversy.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /controversy/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${controversy.id}`)
  expect(status).toBe(401)
})

test('DELETE /controversy/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
