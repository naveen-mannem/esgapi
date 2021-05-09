import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { StandaloneDatapoints } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, standaloneDatapoints

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  standaloneDatapoints = await StandaloneDatapoints.create({ createdBy: user })
})

test('POST /standalone_datapoints 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, companyId: 'test', performanceResult: 'test', response: 'test', year: 'test', standaloneStatus: 'test', taskId: 'test', submittedBy: 'test', submittedDate: 'test', activeStatus: 'test', lastModifiedDate: 'test', modifiedBy: 'test', isSubmitted: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.companyId).toEqual('test')
  expect(body.performanceResult).toEqual('test')
  expect(body.response).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.standaloneStatus).toEqual('test')
  expect(body.taskId).toEqual('test')
  expect(body.submittedBy).toEqual('test')
  expect(body.submittedDate).toEqual('test')
  expect(body.activeStatus).toEqual('test')
  expect(body.lastModifiedDate).toEqual('test')
  expect(body.modifiedBy).toEqual('test')
  expect(body.isSubmitted).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /standalone_datapoints 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /standalone_datapoints 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /standalone_datapoints 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /standalone_datapoints/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${standaloneDatapoints.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(standaloneDatapoints.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /standalone_datapoints/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${standaloneDatapoints.id}`)
  expect(status).toBe(401)
})

test('GET /standalone_datapoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /standalone_datapoints/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${standaloneDatapoints.id}`)
    .send({ access_token: userSession, companyId: 'test', performanceResult: 'test', response: 'test', year: 'test', standaloneStatus: 'test', taskId: 'test', submittedBy: 'test', submittedDate: 'test', activeStatus: 'test', lastModifiedDate: 'test', modifiedBy: 'test', isSubmitted: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(standaloneDatapoints.id)
  expect(body.companyId).toEqual('test')
  expect(body.performanceResult).toEqual('test')
  expect(body.response).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.standaloneStatus).toEqual('test')
  expect(body.taskId).toEqual('test')
  expect(body.submittedBy).toEqual('test')
  expect(body.submittedDate).toEqual('test')
  expect(body.activeStatus).toEqual('test')
  expect(body.lastModifiedDate).toEqual('test')
  expect(body.modifiedBy).toEqual('test')
  expect(body.isSubmitted).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /standalone_datapoints/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${standaloneDatapoints.id}`)
    .send({ access_token: anotherSession, companyId: 'test', performanceResult: 'test', response: 'test', year: 'test', standaloneStatus: 'test', taskId: 'test', submittedBy: 'test', submittedDate: 'test', activeStatus: 'test', lastModifiedDate: 'test', modifiedBy: 'test', isSubmitted: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /standalone_datapoints/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${standaloneDatapoints.id}`)
  expect(status).toBe(401)
})

test('PUT /standalone_datapoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, companyId: 'test', performanceResult: 'test', response: 'test', year: 'test', standaloneStatus: 'test', taskId: 'test', submittedBy: 'test', submittedDate: 'test', activeStatus: 'test', lastModifiedDate: 'test', modifiedBy: 'test', isSubmitted: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /standalone_datapoints/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${standaloneDatapoints.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /standalone_datapoints/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${standaloneDatapoints.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /standalone_datapoints/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${standaloneDatapoints.id}`)
  expect(status).toBe(401)
})

test('DELETE /standalone_datapoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
