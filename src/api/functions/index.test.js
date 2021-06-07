import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Functions } from '.'

const app = () => express(apiRoot, routes)

let userSession, functions

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  functions = await Functions.create({})
})

test('POST /functions 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, functionType: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.functionType).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /functions 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /functions 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /functions 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /functions/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${functions.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(functions.id)
})

test('GET /functions/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${functions.id}`)
  expect(status).toBe(401)
})

test('GET /functions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /functions/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${functions.id}`)
    .send({ access_token: userSession, functionType: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(functions.id)
  expect(body.functionType).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /functions/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${functions.id}`)
  expect(status).toBe(401)
})

test('PUT /functions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, functionType: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /functions/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${functions.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /functions/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${functions.id}`)
  expect(status).toBe(401)
})

test('DELETE /functions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
