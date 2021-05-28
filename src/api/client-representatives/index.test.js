import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { ClientRepresentatives } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, clientRepresentatives

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  clientRepresentatives = await ClientRepresentatives.create({ createdBy: user })
})

test('POST /client-representatives 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, userId: 'test', name: 'test', companyId: 'test', authenticationLetterForClientUrl: 'test', companyIdForClient: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.userId).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.companyId).toEqual('test')
  expect(body.authenticationLetterForClientUrl).toEqual('test')
  expect(body.companyIdForClient).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /client-representatives 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /client-representatives 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /client-representatives 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /client-representatives/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${clientRepresentatives.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(clientRepresentatives.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /client-representatives/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${clientRepresentatives.id}`)
  expect(status).toBe(401)
})

test('GET /client-representatives/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /client-representatives/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${clientRepresentatives.id}`)
    .send({ access_token: userSession, userId: 'test', name: 'test', companyId: 'test', authenticationLetterForClientUrl: 'test', companyIdForClient: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(clientRepresentatives.id)
  expect(body.userId).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.companyId).toEqual('test')
  expect(body.authenticationLetterForClientUrl).toEqual('test')
  expect(body.companyIdForClient).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /client-representatives/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${clientRepresentatives.id}`)
    .send({ access_token: anotherSession, userId: 'test', name: 'test', companyId: 'test', authenticationLetterForClientUrl: 'test', companyIdForClient: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /client-representatives/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${clientRepresentatives.id}`)
  expect(status).toBe(401)
})

test('PUT /client-representatives/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, userId: 'test', name: 'test', companyId: 'test', authenticationLetterForClientUrl: 'test', companyIdForClient: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /client-representatives/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${clientRepresentatives.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /client-representatives/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${clientRepresentatives.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /client-representatives/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${clientRepresentatives.id}`)
  expect(status).toBe(401)
})

test('DELETE /client-representatives/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
