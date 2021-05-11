import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { BoardMembers } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, boardMembers

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  boardMembers = await BoardMembers.create({ createdBy: user })
})

test('POST /boardMembers 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, companyId: 'test', boardMemberName: 'test', memberStatus: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.companyId).toEqual('test')
  expect(body.boardMemberName).toEqual('test')
  expect(body.memberStatus).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /boardMembers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /boardMembers 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /boardMembers 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /boardMembers/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${boardMembers.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(boardMembers.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /boardMembers/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${boardMembers.id}`)
  expect(status).toBe(401)
})

test('GET /boardMembers/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /boardMembers/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${boardMembers.id}`)
    .send({ access_token: userSession, companyId: 'test', boardMemberName: 'test', memberStatus: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(boardMembers.id)
  expect(body.companyId).toEqual('test')
  expect(body.boardMemberName).toEqual('test')
  expect(body.memberStatus).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /boardMembers/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${boardMembers.id}`)
    .send({ access_token: anotherSession, companyId: 'test', boardMemberName: 'test', memberStatus: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /boardMembers/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${boardMembers.id}`)
  expect(status).toBe(401)
})

test('PUT /boardMembers/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, companyId: 'test', boardMemberName: 'test', memberStatus: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /boardMembers/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${boardMembers.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /boardMembers/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${boardMembers.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /boardMembers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${boardMembers.id}`)
  expect(status).toBe(401)
})

test('DELETE /boardMembers/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
