import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { CompanyRepAssignment } from '.'

const app = () => express(apiRoot, routes)

let companyRepAssignment

beforeEach(async () => {
  companyRepAssignment = await CompanyRepAssignment.create({})
})

test('POST /companyRepAssignment 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, userId: 'test', assignedId: 'test', assignedDate: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.userId).toEqual('test')
  expect(body.assignedId).toEqual('test')
  expect(body.assignedDate).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /companyRepAssignment 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /companyRepAssignment 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /companyRepAssignment 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /companyRepAssignment/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${companyRepAssignment.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(companyRepAssignment.id)
})

test('GET /companyRepAssignment/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${companyRepAssignment.id}`)
  expect(status).toBe(401)
})

test('GET /companyRepAssignment/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /companyRepAssignment/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${companyRepAssignment.id}`)
    .send({ access_token: masterKey, userId: 'test', assignedId: 'test', assignedDate: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(companyRepAssignment.id)
  expect(body.userId).toEqual('test')
  expect(body.assignedId).toEqual('test')
  expect(body.assignedDate).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /companyRepAssignment/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${companyRepAssignment.id}`)
  expect(status).toBe(401)
})

test('PUT /companyRepAssignment/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, userId: 'test', assignedId: 'test', assignedDate: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /companyRepAssignment/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${companyRepAssignment.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /companyRepAssignment/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${companyRepAssignment.id}`)
  expect(status).toBe(401)
})

test('DELETE /companyRepAssignment/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
