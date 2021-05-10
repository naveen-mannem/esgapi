import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { TaskAssignment } from '.'

const app = () => express(apiRoot, routes)

let taskAssignment

beforeEach(async () => {
  taskAssignment = await TaskAssignment.create({})
})

test('POST /taskAssignment 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, companyId: 'test', categoryId: 'test', groupId: 'test', revisionCode: 'test', assignedTo: 'test', year: 'test', analystSLA: 'test', taskStatus: 'test', analystEmail: 'test', qaEmail: 'test', qaSLA: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.companyId).toEqual('test')
  expect(body.categoryId).toEqual('test')
  expect(body.groupId).toEqual('test')
  expect(body.revisionCode).toEqual('test')
  expect(body.assignedTo).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.analystSLA).toEqual('test')
  expect(body.taskStatus).toEqual('test')
  expect(body.analystEmail).toEqual('test')
  expect(body.qaEmail).toEqual('test')
  expect(body.qaSLA).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('POST /taskAssignment 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /taskAssignment 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /taskAssignment 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /taskAssignment/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${taskAssignment.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(taskAssignment.id)
})

test('GET /taskAssignment/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${taskAssignment.id}`)
  expect(status).toBe(401)
})

test('GET /taskAssignment/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /taskAssignment/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${taskAssignment.id}`)
    .send({ access_token: masterKey, companyId: 'test', categoryId: 'test', groupId: 'test', revisionCode: 'test', assignedTo: 'test', year: 'test', analystSLA: 'test', taskStatus: 'test', analystEmail: 'test', qaEmail: 'test', qaSLA: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(taskAssignment.id)
  expect(body.companyId).toEqual('test')
  expect(body.categoryId).toEqual('test')
  expect(body.groupId).toEqual('test')
  expect(body.revisionCode).toEqual('test')
  expect(body.assignedTo).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.analystSLA).toEqual('test')
  expect(body.taskStatus).toEqual('test')
  expect(body.analystEmail).toEqual('test')
  expect(body.qaEmail).toEqual('test')
  expect(body.qaSLA).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.createdAt).toEqual('test')
  expect(body.updatedAt).toEqual('test')
})

test('PUT /taskAssignment/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${taskAssignment.id}`)
  expect(status).toBe(401)
})

test('PUT /taskAssignment/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, companyId: 'test', categoryId: 'test', groupId: 'test', revisionCode: 'test', assignedTo: 'test', year: 'test', analystSLA: 'test', taskStatus: 'test', analystEmail: 'test', qaEmail: 'test', qaSLA: 'test', status: 'test', createdAt: 'test', updatedAt: 'test' })
  expect(status).toBe(404)
})

test('DELETE /taskAssignment/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${taskAssignment.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /taskAssignment/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${taskAssignment.id}`)
  expect(status).toBe(401)
})

test('DELETE /taskAssignment/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
