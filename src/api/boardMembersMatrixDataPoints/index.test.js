import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { BoardMembersMatrixDataPoints } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, boardMembersMatrixDataPoints

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  boardMembersMatrixDataPoints = await BoardMembersMatrixDataPoints.create({ createdBy: user })
})

test('POST /boardMembersMatrixDataPoints 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, dpCodeId: 'test', boardMemberId: 'test', year: 'test', response: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.dpCodeId).toEqual('test')
  expect(body.boardMemberId).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.response).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /boardMembersMatrixDataPoints 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /boardMembersMatrixDataPoints 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /boardMembersMatrixDataPoints 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /boardMembersMatrixDataPoints/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${boardMembersMatrixDataPoints.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(boardMembersMatrixDataPoints.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /boardMembersMatrixDataPoints/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${boardMembersMatrixDataPoints.id}`)
  expect(status).toBe(401)
})

test('GET /boardMembersMatrixDataPoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /boardMembersMatrixDataPoints/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${boardMembersMatrixDataPoints.id}`)
    .send({ access_token: userSession, dpCodeId: 'test', boardMemberId: 'test', year: 'test', response: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(boardMembersMatrixDataPoints.id)
  expect(body.dpCodeId).toEqual('test')
  expect(body.boardMemberId).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.response).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /boardMembersMatrixDataPoints/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${boardMembersMatrixDataPoints.id}`)
    .send({ access_token: anotherSession, dpCodeId: 'test', boardMemberId: 'test', year: 'test', response: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /boardMembersMatrixDataPoints/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${boardMembersMatrixDataPoints.id}`)
  expect(status).toBe(401)
})

test('PUT /boardMembersMatrixDataPoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, dpCodeId: 'test', boardMemberId: 'test', year: 'test', response: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /boardMembersMatrixDataPoints/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${boardMembersMatrixDataPoints.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /boardMembersMatrixDataPoints/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${boardMembersMatrixDataPoints.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /boardMembersMatrixDataPoints/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${boardMembersMatrixDataPoints.id}`)
  expect(status).toBe(401)
})

test('DELETE /boardMembersMatrixDataPoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
