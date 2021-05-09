import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Taxonomies } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, taxonomies

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  taxonomies = await Taxonomies.create({ createdBy: user })
})

test('POST /taxonomies 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, categoryId: 'test', themeId: 'test', keyIssueId: 'test', indicatorId: 'test', indicatorName: 'test', indicatorDescription: 'test', indicatorPolarity: 'test', dataCollectionGuide: 'test', unit: 'test', dataInput: 'test', isApplicableSector: 'test', notApplicableReason: 'test', datapointType: 'test', datapointReportingPeriod: 'test', fileDataSource: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', sourcePageNumber: 'test', sourceTextSnippetOrSnapshot: 'test', commentsAndCalculations: 'test', signal: 'test', controversy: 'test', controversySnippetOrSnapshot: 'test', snippetOrSnapshotUrl: 'test', sourcePublicationDateOfConspiracy: 'test', conspiracyPageNumber: 'test', normalizedBy: 'test', weighted: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.categoryId).toEqual('test')
  expect(body.themeId).toEqual('test')
  expect(body.keyIssueId).toEqual('test')
  expect(body.indicatorId).toEqual('test')
  expect(body.indicatorName).toEqual('test')
  expect(body.indicatorDescription).toEqual('test')
  expect(body.indicatorPolarity).toEqual('test')
  expect(body.dataCollectionGuide).toEqual('test')
  expect(body.unit).toEqual('test')
  expect(body.dataInput).toEqual('test')
  expect(body.isApplicableSector).toEqual('test')
  expect(body.notApplicableReason).toEqual('test')
  expect(body.datapointType).toEqual('test')
  expect(body.datapointReportingPeriod).toEqual('test')
  expect(body.fileDataSource).toEqual('test')
  expect(body.sourceUrl).toEqual('test')
  expect(body.sourcePublicationDate).toEqual('test')
  expect(body.sourcePageNumber).toEqual('test')
  expect(body.sourceTextSnippetOrSnapshot).toEqual('test')
  expect(body.commentsAndCalculations).toEqual('test')
  expect(body.signal).toEqual('test')
  expect(body.controversy).toEqual('test')
  expect(body.controversySnippetOrSnapshot).toEqual('test')
  expect(body.snippetOrSnapshotUrl).toEqual('test')
  expect(body.sourcePublicationDateOfConspiracy).toEqual('test')
  expect(body.conspiracyPageNumber).toEqual('test')
  expect(body.normalizedBy).toEqual('test')
  expect(body.weighted).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /taxonomies 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /taxonomies 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /taxonomies 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /taxonomies/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${taxonomies.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(taxonomies.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /taxonomies/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${taxonomies.id}`)
  expect(status).toBe(401)
})

test('GET /taxonomies/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /taxonomies/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${taxonomies.id}`)
    .send({ access_token: userSession, categoryId: 'test', themeId: 'test', keyIssueId: 'test', indicatorId: 'test', indicatorName: 'test', indicatorDescription: 'test', indicatorPolarity: 'test', dataCollectionGuide: 'test', unit: 'test', dataInput: 'test', isApplicableSector: 'test', notApplicableReason: 'test', datapointType: 'test', datapointReportingPeriod: 'test', fileDataSource: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', sourcePageNumber: 'test', sourceTextSnippetOrSnapshot: 'test', commentsAndCalculations: 'test', signal: 'test', controversy: 'test', controversySnippetOrSnapshot: 'test', snippetOrSnapshotUrl: 'test', sourcePublicationDateOfConspiracy: 'test', conspiracyPageNumber: 'test', normalizedBy: 'test', weighted: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(taxonomies.id)
  expect(body.categoryId).toEqual('test')
  expect(body.themeId).toEqual('test')
  expect(body.keyIssueId).toEqual('test')
  expect(body.indicatorId).toEqual('test')
  expect(body.indicatorName).toEqual('test')
  expect(body.indicatorDescription).toEqual('test')
  expect(body.indicatorPolarity).toEqual('test')
  expect(body.dataCollectionGuide).toEqual('test')
  expect(body.unit).toEqual('test')
  expect(body.dataInput).toEqual('test')
  expect(body.isApplicableSector).toEqual('test')
  expect(body.notApplicableReason).toEqual('test')
  expect(body.datapointType).toEqual('test')
  expect(body.datapointReportingPeriod).toEqual('test')
  expect(body.fileDataSource).toEqual('test')
  expect(body.sourceUrl).toEqual('test')
  expect(body.sourcePublicationDate).toEqual('test')
  expect(body.sourcePageNumber).toEqual('test')
  expect(body.sourceTextSnippetOrSnapshot).toEqual('test')
  expect(body.commentsAndCalculations).toEqual('test')
  expect(body.signal).toEqual('test')
  expect(body.controversy).toEqual('test')
  expect(body.controversySnippetOrSnapshot).toEqual('test')
  expect(body.snippetOrSnapshotUrl).toEqual('test')
  expect(body.sourcePublicationDateOfConspiracy).toEqual('test')
  expect(body.conspiracyPageNumber).toEqual('test')
  expect(body.normalizedBy).toEqual('test')
  expect(body.weighted).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /taxonomies/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${taxonomies.id}`)
    .send({ access_token: anotherSession, categoryId: 'test', themeId: 'test', keyIssueId: 'test', indicatorId: 'test', indicatorName: 'test', indicatorDescription: 'test', indicatorPolarity: 'test', dataCollectionGuide: 'test', unit: 'test', dataInput: 'test', isApplicableSector: 'test', notApplicableReason: 'test', datapointType: 'test', datapointReportingPeriod: 'test', fileDataSource: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', sourcePageNumber: 'test', sourceTextSnippetOrSnapshot: 'test', commentsAndCalculations: 'test', signal: 'test', controversy: 'test', controversySnippetOrSnapshot: 'test', snippetOrSnapshotUrl: 'test', sourcePublicationDateOfConspiracy: 'test', conspiracyPageNumber: 'test', normalizedBy: 'test', weighted: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /taxonomies/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${taxonomies.id}`)
  expect(status).toBe(401)
})

test('PUT /taxonomies/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, categoryId: 'test', themeId: 'test', keyIssueId: 'test', indicatorId: 'test', indicatorName: 'test', indicatorDescription: 'test', indicatorPolarity: 'test', dataCollectionGuide: 'test', unit: 'test', dataInput: 'test', isApplicableSector: 'test', notApplicableReason: 'test', datapointType: 'test', datapointReportingPeriod: 'test', fileDataSource: 'test', sourceUrl: 'test', sourcePublicationDate: 'test', sourcePageNumber: 'test', sourceTextSnippetOrSnapshot: 'test', commentsAndCalculations: 'test', signal: 'test', controversy: 'test', controversySnippetOrSnapshot: 'test', snippetOrSnapshotUrl: 'test', sourcePublicationDateOfConspiracy: 'test', conspiracyPageNumber: 'test', normalizedBy: 'test', weighted: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /taxonomies/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${taxonomies.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /taxonomies/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${taxonomies.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /taxonomies/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${taxonomies.id}`)
  expect(status).toBe(401)
})

test('DELETE /taxonomies/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
