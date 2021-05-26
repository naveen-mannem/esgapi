import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Datapoints } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, datapoints

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  datapoints = await Datapoints.create({ updatedBy: user })
})

test('POST /datapoints 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, categoryId: 'test', name: 'test', code: 'test', description: 'test', polarity: 'test', dataCollection: 'test', unit: 'test', signal: 'test', percentile: 'test', finalUnit: 'test', keyIssueId: 'test', functionId: 'test', dpType: 'test', year: 'test', companyTaxonomyId: 'test', dpStatus: 'test', sourceName: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', pageNumber: 'test', textSnippet: 'test', screenshotType: 'test', filePath: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.categoryId).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.code).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.polarity).toEqual('test')
  expect(body.dataCollection).toEqual('test')
  expect(body.unit).toEqual('test')
  expect(body.signal).toEqual('test')
  expect(body.percentile).toEqual('test')
  expect(body.finalUnit).toEqual('test')
  expect(body.keyIssueId).toEqual('test')
  expect(body.functionId).toEqual('test')
  expect(body.dpType).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.companyTaxonomyId).toEqual('test')
  expect(body.dpStatus).toEqual('test')
  expect(body.sourceName).toEqual('test')
  expect(body.sourceUrl).toEqual('test')
  expect(body.sourcePublicationDate).toEqual('test')
  expect(body.pageNumber).toEqual('test')
  expect(body.textSnippet).toEqual('test')
  expect(body.screenshotType).toEqual('test')
  expect(body.filePath).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.updatedBy).toEqual('object')
})

test('POST /datapoints 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /datapoints 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].updatedBy).toEqual('object')
})

test('GET /datapoints 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /datapoints/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${datapoints.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(datapoints.id)
  expect(typeof body.updatedBy).toEqual('object')
})

test('GET /datapoints/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${datapoints.id}`)
  expect(status).toBe(401)
})

test('GET /datapoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /datapoints/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${datapoints.id}`)
    .send({ access_token: userSession, categoryId: 'test', name: 'test', code: 'test', description: 'test', polarity: 'test', dataCollection: 'test', unit: 'test', signal: 'test', percentile: 'test', finalUnit: 'test', keyIssueId: 'test', functionId: 'test', dpType: 'test', year: 'test', companyTaxonomyId: 'test', dpStatus: 'test', sourceName: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', pageNumber: 'test', textSnippet: 'test', screenshotType: 'test', filePath: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(datapoints.id)
  expect(body.categoryId).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.code).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.polarity).toEqual('test')
  expect(body.dataCollection).toEqual('test')
  expect(body.unit).toEqual('test')
  expect(body.signal).toEqual('test')
  expect(body.percentile).toEqual('test')
  expect(body.finalUnit).toEqual('test')
  expect(body.keyIssueId).toEqual('test')
  expect(body.functionId).toEqual('test')
  expect(body.dpType).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.companyTaxonomyId).toEqual('test')
  expect(body.dpStatus).toEqual('test')
  expect(body.sourceName).toEqual('test')
  expect(body.sourceUrl).toEqual('test')
  expect(body.sourcePublicationDate).toEqual('test')
  expect(body.pageNumber).toEqual('test')
  expect(body.textSnippet).toEqual('test')
  expect(body.screenshotType).toEqual('test')
  expect(body.filePath).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.updatedBy).toEqual('object')
})

test('PUT /datapoints/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${datapoints.id}`)
    .send({ access_token: anotherSession, categoryId: 'test', name: 'test', code: 'test', description: 'test', polarity: 'test', dataCollection: 'test', unit: 'test', signal: 'test', percentile: 'test', finalUnit: 'test', keyIssueId: 'test', functionId: 'test', dpType: 'test', year: 'test', companyTaxonomyId: 'test', dpStatus: 'test', sourceName: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', pageNumber: 'test', textSnippet: 'test', screenshotType: 'test', filePath: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /datapoints/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${datapoints.id}`)
  expect(status).toBe(401)
})

test('PUT /datapoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, categoryId: 'test', name: 'test', code: 'test', description: 'test', polarity: 'test', dataCollection: 'test', unit: 'test', signal: 'test', percentile: 'test', finalUnit: 'test', keyIssueId: 'test', functionId: 'test', dpType: 'test', year: 'test', companyTaxonomyId: 'test', dpStatus: 'test', sourceName: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', pageNumber: 'test', textSnippet: 'test', screenshotType: 'test', filePath: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /datapoints/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${datapoints.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /datapoints/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${datapoints.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /datapoints/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${datapoints.id}`)
  expect(status).toBe(401)
})

test('DELETE /datapoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
