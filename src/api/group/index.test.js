import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Group } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, group

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  group = await Group.create({ createdBy: user })
})

test('POST /groups 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, groupName: 'test', groupAdmin: 'test', batchId: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.groupName).toEqual('test')
  expect(body.groupAdmin).toEqual('test')
  expect(body.batchId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /groups 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groups 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /groups 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groups/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${group.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(group.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /groups/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${group.id}`)
  expect(status).toBe(401)
})

test('GET /groups/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /groups/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${group.id}`)
    .send({ access_token: userSession, groupName: 'test', groupAdmin: 'test', batchId: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(group.id)
  expect(body.groupName).toEqual('test')
  expect(body.groupAdmin).toEqual('test')
  expect(body.batchId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /groups/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${group.id}`)
    .send({ access_token: anotherSession, groupName: 'test', groupAdmin: 'test', batchId: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /groups/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${group.id}`)
  expect(status).toBe(401)
})

test('PUT /groups/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, groupName: 'test', groupAdmin: 'test', batchId: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /groups/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${group.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /groups/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${group.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /groups/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${group.id}`)
  expect(status).toBe(401)
})

test('DELETE /groups/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
