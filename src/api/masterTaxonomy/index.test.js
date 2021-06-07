import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { MasterTaxonomy } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, masterTaxonomy

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  masterTaxonomy = await MasterTaxonomy.create({ createdBy: user })
})

test('POST /masterTaxonomies 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, fields: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.fields).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /masterTaxonomies 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /masterTaxonomies 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /masterTaxonomies 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /masterTaxonomies/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${masterTaxonomy.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(masterTaxonomy.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /masterTaxonomies/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${masterTaxonomy.id}`)
  expect(status).toBe(401)
})

test('GET /masterTaxonomies/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /masterTaxonomies/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${masterTaxonomy.id}`)
    .send({ access_token: userSession, fields: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(masterTaxonomy.id)
  expect(body.fields).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /masterTaxonomies/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${masterTaxonomy.id}`)
    .send({ access_token: anotherSession, fields: 'test' })
  expect(status).toBe(401)
})

test('PUT /masterTaxonomies/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${masterTaxonomy.id}`)
  expect(status).toBe(401)
})

test('PUT /masterTaxonomies/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, fields: 'test' })
  expect(status).toBe(404)
})

test('DELETE /masterTaxonomies/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${masterTaxonomy.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /masterTaxonomies/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${masterTaxonomy.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /masterTaxonomies/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${masterTaxonomy.id}`)
  expect(status).toBe(401)
})

test('DELETE /masterTaxonomies/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
