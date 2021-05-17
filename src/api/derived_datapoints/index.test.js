import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { DerivedDatapoints } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, derivedDatapoints

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  derivedDatapoints = await DerivedDatapoints.create({ createdBy: user })
})

test('POST /derived_datapoints 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, companyId: 'test', datapointId: 'test', response: 'test', performanceResult: 'test', activeStatus: 'test', dpStatus: 'test', year: 'test', fiscalYearEndDate: 'test', lastModifiedDate: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.companyId).toEqual('test')
  expect(body.datapointId).toEqual('test')
  expect(body.response).toEqual('test')
  expect(body.performanceResult).toEqual('test')
  expect(body.activeStatus).toEqual('test')
  expect(body.dpStatus).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.fiscalYearEndDate).toEqual('test')
  expect(body.lastModifiedDate).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /derived_datapoints 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /derived_datapoints 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /derived_datapoints 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /derived_datapoints/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${derivedDatapoints.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(derivedDatapoints.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /derived_datapoints/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${derivedDatapoints.id}`)
  expect(status).toBe(401)
})

test('GET /derived_datapoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /derived_datapoints/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${derivedDatapoints.id}`)
    .send({ access_token: userSession, companyId: 'test', datapointId: 'test', response: 'test', performanceResult: 'test', activeStatus: 'test', dpStatus: 'test', year: 'test', fiscalYearEndDate: 'test', lastModifiedDate: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(derivedDatapoints.id)
  expect(body.companyId).toEqual('test')
  expect(body.datapointId).toEqual('test')
  expect(body.response).toEqual('test')
  expect(body.performanceResult).toEqual('test')
  expect(body.activeStatus).toEqual('test')
  expect(body.dpStatus).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.fiscalYearEndDate).toEqual('test')
  expect(body.lastModifiedDate).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /derived_datapoints/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${derivedDatapoints.id}`)
    .send({ access_token: anotherSession, companyId: 'test', datapointId: 'test', response: 'test', performanceResult: 'test', activeStatus: 'test', dpStatus: 'test', year: 'test', fiscalYearEndDate: 'test', lastModifiedDate: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /derived_datapoints/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${derivedDatapoints.id}`)
  expect(status).toBe(401)
})

test('PUT /derived_datapoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, companyId: 'test', datapointId: 'test', response: 'test', performanceResult: 'test', activeStatus: 'test', dpStatus: 'test', year: 'test', fiscalYearEndDate: 'test', lastModifiedDate: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /derived_datapoints/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${derivedDatapoints.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /derived_datapoints/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${derivedDatapoints.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /derived_datapoints/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${derivedDatapoints.id}`)
  expect(status).toBe(401)
})

test('DELETE /derived_datapoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
