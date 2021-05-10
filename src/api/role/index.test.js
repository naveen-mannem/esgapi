import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Role } from '.'

const app = () => express(apiRoot, routes)

let role

beforeEach(async () => {
  role = await Role.create({})
})

test('POST /role 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, roleName: 'test', roleCode: 'test', status: 'test', createdBy: 'test', createdAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.roleName).toEqual('test')
  expect(body.roleCode).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdBy).toEqual('test')
  expect(body.createdAt).toEqual('test')
})

test('POST /role 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /role 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /role 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /role/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${role.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(role.id)
})

test('GET /role/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${role.id}`)
  expect(status).toBe(401)
})

test('GET /role/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /role/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${role.id}`)
    .send({ access_token: masterKey, roleName: 'test', roleCode: 'test', status: 'test', createdBy: 'test', createdAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(role.id)
  expect(body.roleName).toEqual('test')
  expect(body.roleCode).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdBy).toEqual('test')
  expect(body.createdAt).toEqual('test')
})

test('PUT /role/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${role.id}`)
  expect(status).toBe(401)
})

test('PUT /role/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, roleName: 'test', roleCode: 'test', status: 'test', createdBy: 'test', createdAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /role/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${role.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /role/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${role.id}`)
  expect(status).toBe(401)
})

test('DELETE /role/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
