import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { TaskSlaLog } from '.'

const app = () => express(apiRoot, routes)

let taskSlaLog

beforeEach(async () => {
  taskSlaLog = await TaskSlaLog.create({})
})

test('POST /taskSLALog 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, taskId: 'test', currentDate: 'test', preferredDate: 'test', loggedBy: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.taskId).toEqual('test')
  expect(body.currentDate).toEqual('test')
  expect(body.preferredDate).toEqual('test')
  expect(body.loggedBy).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /taskSLALog 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /taskSLALog 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /taskSLALog 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /taskSLALog/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${taskSlaLog.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(taskSlaLog.id)
})

test('GET /taskSLALog/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${taskSlaLog.id}`)
  expect(status).toBe(401)
})

test('GET /taskSLALog/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /taskSLALog/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${taskSlaLog.id}`)
    .send({ access_token: masterKey, taskId: 'test', currentDate: 'test', preferredDate: 'test', loggedBy: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(taskSlaLog.id)
  expect(body.taskId).toEqual('test')
  expect(body.currentDate).toEqual('test')
  expect(body.preferredDate).toEqual('test')
  expect(body.loggedBy).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /taskSLALog/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${taskSlaLog.id}`)
  expect(status).toBe(401)
})

test('PUT /taskSLALog/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, taskId: 'test', currentDate: 'test', preferredDate: 'test', loggedBy: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /taskSLALog/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${taskSlaLog.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /taskSLALog/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${taskSlaLog.id}`)
  expect(status).toBe(401)
})

test('DELETE /taskSLALog/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
