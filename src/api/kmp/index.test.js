import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Kmp } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, kmp

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  kmp = await Kmp.create({ createdBy: user })
})

test('POST /kmps 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, companyId: 'test', kmpMemberName: 'test', memberStatus: 'test', year: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.companyId).toEqual('test')
  expect(body.kmpMemberName).toEqual('test')
  expect(body.memberStatus).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /kmps 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /kmps 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /kmps 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /kmps/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${kmp.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(kmp.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /kmps/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${kmp.id}`)
  expect(status).toBe(401)
})

test('GET /kmps/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /kmps/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${kmp.id}`)
    .send({ access_token: userSession, companyId: 'test', kmpMemberName: 'test', memberStatus: 'test', year: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(kmp.id)
  expect(body.companyId).toEqual('test')
  expect(body.kmpMemberName).toEqual('test')
  expect(body.memberStatus).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /kmps/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${kmp.id}`)
    .send({ access_token: anotherSession, companyId: 'test', kmpMemberName: 'test', memberStatus: 'test', year: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /kmps/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${kmp.id}`)
  expect(status).toBe(401)
})

test('PUT /kmps/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, companyId: 'test', kmpMemberName: 'test', memberStatus: 'test', year: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /kmps/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kmp.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /kmps/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kmp.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /kmps/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kmp.id}`)
  expect(status).toBe(401)
})

test('DELETE /kmps/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
