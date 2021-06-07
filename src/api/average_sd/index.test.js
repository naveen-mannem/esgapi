import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { AverageSd } from '.'

const app = () => express(apiRoot, routes)

let userSession, averageSd

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  averageSd = await AverageSd.create({})
})

test('POST /average_sd 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, companyId: 'test', year: 'test', stdDeviation: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.companyId).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.stdDeviation).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /average_sd 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /average_sd 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /average_sd 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /average_sd/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${averageSd.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(averageSd.id)
})

test('GET /average_sd/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${averageSd.id}`)
  expect(status).toBe(401)
})

test('GET /average_sd/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /average_sd/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${averageSd.id}`)
    .send({ access_token: userSession, companyId: 'test', year: 'test', stdDeviation: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(averageSd.id)
  expect(body.companyId).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.stdDeviation).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /average_sd/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${averageSd.id}`)
  expect(status).toBe(401)
})

test('PUT /average_sd/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, companyId: 'test', year: 'test', stdDeviation: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /average_sd/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${averageSd.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /average_sd/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${averageSd.id}`)
  expect(status).toBe(401)
})

test('DELETE /average_sd/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
