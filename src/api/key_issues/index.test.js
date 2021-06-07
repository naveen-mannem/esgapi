import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { KeyIssues } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, keyIssues

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  keyIssues = await KeyIssues.create({})
})

test('POST /key_issues 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, keyIssueName: 'test', keyIssueCode: 'test', keyIssueDescription: 'test', themeId: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.keyIssueName).toEqual('test')
  expect(body.keyIssueCode).toEqual('test')
  expect(body.keyIssueDescription).toEqual('test')
  expect(body.themeId).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /key_issues 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /key_issues 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /key_issues 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /key_issues 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /key_issues/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${keyIssues.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(keyIssues.id)
})

test('GET /key_issues/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${keyIssues.id}`)
  expect(status).toBe(401)
})

test('GET /key_issues/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /key_issues/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${keyIssues.id}`)
    .send({ access_token: adminSession, keyIssueName: 'test', keyIssueCode: 'test', keyIssueDescription: 'test', themeId: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(keyIssues.id)
  expect(body.keyIssueName).toEqual('test')
  expect(body.keyIssueCode).toEqual('test')
  expect(body.keyIssueDescription).toEqual('test')
  expect(body.themeId).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /key_issues/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${keyIssues.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /key_issues/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${keyIssues.id}`)
  expect(status).toBe(401)
})

test('PUT /key_issues/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, keyIssueName: 'test', keyIssueCode: 'test', keyIssueDescription: 'test', themeId: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /key_issues/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${keyIssues.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /key_issues/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${keyIssues.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /key_issues/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${keyIssues.id}`)
  expect(status).toBe(401)
})

test('DELETE /key_issues/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
