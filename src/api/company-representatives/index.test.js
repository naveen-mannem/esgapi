import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { CompanyRepresentatives } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, companyRepresentatives

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  companyRepresentatives = await CompanyRepresentatives.create({ createdBy: user })
})

test('POST /company-representatives 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, userId: 'test', name: 'test', companiesList: 'test', authenticationLetterForCompanyUrl: 'test', companyIdForCompany: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.userId).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.companiesList).toEqual('test')
  expect(body.authenticationLetterForCompanyUrl).toEqual('test')
  expect(body.companyIdForCompany).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /company-representatives 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /company-representatives 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /company-representatives 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /company-representatives/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${companyRepresentatives.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(companyRepresentatives.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /company-representatives/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${companyRepresentatives.id}`)
  expect(status).toBe(401)
})

test('GET /company-representatives/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /company-representatives/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${companyRepresentatives.id}`)
    .send({ access_token: userSession, userId: 'test', name: 'test', companiesList: 'test', authenticationLetterForCompanyUrl: 'test', companyIdForCompany: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(companyRepresentatives.id)
  expect(body.userId).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.companiesList).toEqual('test')
  expect(body.authenticationLetterForCompanyUrl).toEqual('test')
  expect(body.companyIdForCompany).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /company-representatives/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${companyRepresentatives.id}`)
    .send({ access_token: anotherSession, userId: 'test', name: 'test', companiesList: 'test', authenticationLetterForCompanyUrl: 'test', companyIdForCompany: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /company-representatives/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${companyRepresentatives.id}`)
  expect(status).toBe(401)
})

test('PUT /company-representatives/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, userId: 'test', name: 'test', companiesList: 'test', authenticationLetterForCompanyUrl: 'test', companyIdForCompany: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /company-representatives/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${companyRepresentatives.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /company-representatives/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${companyRepresentatives.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /company-representatives/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${companyRepresentatives.id}`)
  expect(status).toBe(401)
})

test('DELETE /company-representatives/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
