import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { GroupQa } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, groupQa

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  groupQa = await GroupQa.create({ createdBy: user })
})

test('POST /groupQAS 201 (user)', async () => {
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

test('POST /groupQAS 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groupQAS 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /groupQAS 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /groupQAS/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${groupQa.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(groupQa.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /groupQAS/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${groupQa.id}`)
  expect(status).toBe(401)
})

test('GET /groupQAS/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /groupQAS/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${groupQa.id}`)
    .send({ access_token: userSession, userId: 'test', groupId: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(groupQa.id)
  expect(body.userId).toEqual('test')
  expect(body.groupId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /groupQAS/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${groupQa.id}`)
    .send({ access_token: anotherSession, userId: 'test', groupId: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /groupQAS/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${groupQa.id}`)
  expect(status).toBe(401)
})

test('PUT /groupQAS/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, userId: 'test', groupId: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /groupQAS/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groupQa.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /groupQAS/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groupQa.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /groupQAS/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${groupQa.id}`)
  expect(status).toBe(401)
})

test('DELETE /groupQAS/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
