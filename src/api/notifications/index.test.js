import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Notifications } from '.'

const app = () => express(apiRoot, routes)

let userSession, notifications

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  notifications = await Notifications.create({})
})

test('POST /notifications 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, notifyToUser: 'test', notificationType: 'test', content: 'test', notificationTitle: 'test', isRead: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.notifyToUser).toEqual('test')
  expect(body.notificationType).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.notificationTitle).toEqual('test')
  expect(body.isRead).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /notifications 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /notifications 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /notifications 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /notifications/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${notifications.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(notifications.id)
})

test('GET /notifications/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${notifications.id}`)
  expect(status).toBe(401)
})

test('GET /notifications/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /notifications/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${notifications.id}`)
    .send({ access_token: userSession, notifyToUser: 'test', notificationType: 'test', content: 'test', notificationTitle: 'test', isRead: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(notifications.id)
  expect(body.notifyToUser).toEqual('test')
  expect(body.notificationType).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.notificationTitle).toEqual('test')
  expect(body.isRead).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /notifications/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${notifications.id}`)
  expect(status).toBe(401)
})

test('PUT /notifications/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, notifyToUser: 'test', notificationType: 'test', content: 'test', notificationTitle: 'test', isRead: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /notifications/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notifications.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /notifications/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notifications.id}`)
  expect(status).toBe(401)
})

test('DELETE /notifications/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
