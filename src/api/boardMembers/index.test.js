import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { BoardMembers } from '.'

const app = () => express(apiRoot, routes)

let boardMembers

beforeEach(async () => {
  boardMembers = await BoardMembers.create({})
})

test('POST /boardMembers 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, companyId: 'test', boardMemberName: 'test', memberStatus: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.companyId).toEqual('test')
  expect(body.boardMemberName).toEqual('test')
  expect(body.memberStatus).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /boardMembers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /boardMembers 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /boardMembers 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /boardMembers/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${boardMembers.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(boardMembers.id)
})

test('GET /boardMembers/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${boardMembers.id}`)
  expect(status).toBe(401)
})

test('GET /boardMembers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /boardMembers/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${boardMembers.id}`)
    .send({ access_token: masterKey, companyId: 'test', boardMemberName: 'test', memberStatus: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(boardMembers.id)
  expect(body.companyId).toEqual('test')
  expect(body.boardMemberName).toEqual('test')
  expect(body.memberStatus).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /boardMembers/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${boardMembers.id}`)
  expect(status).toBe(401)
})

test('PUT /boardMembers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, companyId: 'test', boardMemberName: 'test', memberStatus: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /boardMembers/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${boardMembers.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /boardMembers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${boardMembers.id}`)
  expect(status).toBe(401)
})

test('DELETE /boardMembers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
