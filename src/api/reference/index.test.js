import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Reference } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, reference

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  reference = await Reference.create({ createdBy: user })
})

test('POST /references 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, standaloneId: 'test', sourceName: 'test', url: 'test', pageNumber: 'test', publicationDate: 'test', textSnippet: 'test', screenshotInPNG: 'test', screenshotType: 'test', filePath: 'test', activeStatus: 'test', status: 'test' })
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
  expect(body.activeStatus).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /references 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /references 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /references 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /references/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${reference.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reference.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /references/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${reference.id}`)
  expect(status).toBe(401)
})

test('GET /references/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /references/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${reference.id}`)
    .send({ access_token: userSession, standaloneId: 'test', sourceName: 'test', url: 'test', pageNumber: 'test', publicationDate: 'test', textSnippet: 'test', screenshotInPNG: 'test', screenshotType: 'test', filePath: 'test', activeStatus: 'test', status: 'test' })
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
  expect(body.activeStatus).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /references/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${reference.id}`)
    .send({ access_token: anotherSession, standaloneId: 'test', sourceName: 'test', url: 'test', pageNumber: 'test', publicationDate: 'test', textSnippet: 'test', screenshotInPNG: 'test', screenshotType: 'test', filePath: 'test', activeStatus: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /references/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${reference.id}`)
  expect(status).toBe(401)
})

test('PUT /references/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, standaloneId: 'test', sourceName: 'test', url: 'test', pageNumber: 'test', publicationDate: 'test', textSnippet: 'test', screenshotInPNG: 'test', screenshotType: 'test', filePath: 'test', activeStatus: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /references/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reference.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /references/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reference.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /references/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reference.id}`)
  expect(status).toBe(401)
})

test('DELETE /references/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
