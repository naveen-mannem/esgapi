import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { GroupAnalyst } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, groupAnalyst

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  groupAnalyst = await GroupAnalyst.create({ createdBy: user })
})

test('POST /groupAnalysts 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, userId: 'test', groupId: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.userId).toEqual('test')
  expect(body.groupId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /groupAnalysts 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groupAnalysts 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /groupAnalysts 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groupAnalysts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${groupAnalyst.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(groupAnalyst.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /groupAnalysts/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${groupAnalyst.id}`)
  expect(status).toBe(401)
})

test('GET /groupAnalysts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /groupAnalysts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${groupAnalyst.id}`)
    .send({ access_token: userSession, userId: 'test', groupId: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(groupAnalyst.id)
  expect(body.userId).toEqual('test')
  expect(body.groupId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /groupAnalysts/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${groupAnalyst.id}`)
    .send({ access_token: anotherSession, userId: 'test', groupId: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /groupAnalysts/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${groupAnalyst.id}`)
  expect(status).toBe(401)
})

test('PUT /groupAnalysts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, userId: 'test', groupId: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /groupAnalysts/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groupAnalyst.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /groupAnalysts/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groupAnalyst.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /groupAnalysts/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groupAnalyst.id}`)
  expect(status).toBe(401)
})

test('DELETE /groupAnalysts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
