import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Reference } from '.'

const app = () => express(apiRoot, routes)

let reference

beforeEach(async () => {
  reference = await Reference.create({})
})

test('POST /reference 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, standaloneId: 'test', sourceName: 'test', url: 'test', pageNumber: 'test', publicationDate: 'test', textSnippet: 'test', screenshotInPNG: 'test', screenshotType: 'test', filePath: 'test', createdBy: 'test', activeStatus: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.standaloneId).toEqual('test')
  expect(body.sourceName).toEqual('test')
  expect(body.url).toEqual('test')
  expect(body.pageNumber).toEqual('test')
  expect(body.publicationDate).toEqual('test')
  expect(body.textSnippet).toEqual('test')
  expect(body.screenshotInPNG).toEqual('test')
  expect(body.screenshotType).toEqual('test')
  expect(body.filePath).toEqual('test')
  expect(body.createdBy).toEqual('test')
  expect(body.activeStatus).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /reference 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /reference 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /reference 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /reference/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${reference.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reference.id)
})

test('GET /reference/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${reference.id}`)
  expect(status).toBe(401)
})

test('GET /reference/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /reference/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${reference.id}`)
    .send({ access_token: masterKey, standaloneId: 'test', sourceName: 'test', url: 'test', pageNumber: 'test', publicationDate: 'test', textSnippet: 'test', screenshotInPNG: 'test', screenshotType: 'test', filePath: 'test', createdBy: 'test', activeStatus: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reference.id)
  expect(body.standaloneId).toEqual('test')
  expect(body.sourceName).toEqual('test')
  expect(body.url).toEqual('test')
  expect(body.pageNumber).toEqual('test')
  expect(body.publicationDate).toEqual('test')
  expect(body.textSnippet).toEqual('test')
  expect(body.screenshotInPNG).toEqual('test')
  expect(body.screenshotType).toEqual('test')
  expect(body.filePath).toEqual('test')
  expect(body.createdBy).toEqual('test')
  expect(body.activeStatus).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /reference/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${reference.id}`)
  expect(status).toBe(401)
})

test('PUT /reference/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, standaloneId: 'test', sourceName: 'test', url: 'test', pageNumber: 'test', publicationDate: 'test', textSnippet: 'test', screenshotInPNG: 'test', screenshotType: 'test', filePath: 'test', createdBy: 'test', activeStatus: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /reference/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reference.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /reference/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reference.id}`)
  expect(status).toBe(401)
})

test('DELETE /reference/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
