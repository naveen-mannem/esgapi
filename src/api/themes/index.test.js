import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Themes } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, themes

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  themes = await Themes.create({})
})

test('POST /themes 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, themeName: 'test', themeCode: 'test', themeDescription: 'test', categoryId: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.themeName).toEqual('test')
  expect(body.themeCode).toEqual('test')
  expect(body.themeDescription).toEqual('test')
  expect(body.categoryId).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /themes 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /themes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /themes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /themes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /themes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${themes.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(themes.id)
})

test('GET /themes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${themes.id}`)
  expect(status).toBe(401)
})

test('GET /themes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /themes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${themes.id}`)
    .send({ access_token: adminSession, themeName: 'test', themeCode: 'test', themeDescription: 'test', categoryId: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(themes.id)
  expect(body.themeName).toEqual('test')
  expect(body.themeCode).toEqual('test')
  expect(body.themeDescription).toEqual('test')
  expect(body.categoryId).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /themes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${themes.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /themes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${themes.id}`)
  expect(status).toBe(401)
})

test('PUT /themes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, themeName: 'test', themeCode: 'test', themeDescription: 'test', categoryId: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /themes/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${themes.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /themes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${themes.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /themes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${themes.id}`)
  expect(status).toBe(401)
})

test('DELETE /themes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
