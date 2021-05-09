import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Datapoints, { schema } from './model'

const router = new Router()
const { name, code, description, dataCollection, unit, signal, percentile, finalUnit, keyIssueId, functionId, dpType, year, companyTaxonomyId, dpStatus, sourceName, sourceUrl, sourcePublicationDate, pageNumber, textSnippet, screenshotType, filePath, status } = schema.tree

/**
 * @api {post} /datapoints Create datapoints
 * @apiName CreateDatapoints
 * @apiGroup Datapoints
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Datapoints's name.
 * @apiParam code Datapoints's code.
 * @apiParam description Datapoints's description.
 * @apiParam dataCollection Datapoints's dataCollection.
 * @apiParam unit Datapoints's unit.
 * @apiParam signal Datapoints's signal.
 * @apiParam percentile Datapoints's percentile.
 * @apiParam finalUnit Datapoints's finalUnit.
 * @apiParam keyIssueId Datapoints's keyIssueId.
 * @apiParam functionId Datapoints's functionId.
 * @apiParam dpType Datapoints's dpType.
 * @apiParam year Datapoints's year.
 * @apiParam companyTaxonomyId Datapoints's companyTaxonomyId.
 * @apiParam dpStatus Datapoints's dpStatus.
 * @apiParam sourceName Datapoints's sourceName.
 * @apiParam sourceUrl Datapoints's sourceUrl.
 * @apiParam sourcePublicationDate Datapoints's sourcePublicationDate.
 * @apiParam pageNumber Datapoints's pageNumber.
 * @apiParam textSnippet Datapoints's textSnippet.
 * @apiParam screenshotType Datapoints's screenshotType.
 * @apiParam filePath Datapoints's filePath.
 * @apiParam status Datapoints's status.
 * @apiSuccess {Object} datapoints Datapoints's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Datapoints not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, code, description, dataCollection, unit, signal, percentile, finalUnit, keyIssueId, functionId, dpType, year, companyTaxonomyId, dpStatus, sourceName, sourceUrl, sourcePublicationDate, pageNumber, textSnippet, screenshotType, filePath, status }),
  create)

/**
 * @api {get} /datapoints Retrieve datapoints
 * @apiName RetrieveDatapoints
 * @apiGroup Datapoints
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of datapoints.
 * @apiSuccess {Object[]} rows List of datapoints.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /datapoints/:id Retrieve datapoints
 * @apiName RetrieveDatapoints
 * @apiGroup Datapoints
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} datapoints Datapoints's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Datapoints not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /datapoints/:id Update datapoints
 * @apiName UpdateDatapoints
 * @apiGroup Datapoints
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Datapoints's name.
 * @apiParam code Datapoints's code.
 * @apiParam description Datapoints's description.
 * @apiParam dataCollection Datapoints's dataCollection.
 * @apiParam unit Datapoints's unit.
 * @apiParam signal Datapoints's signal.
 * @apiParam percentile Datapoints's percentile.
 * @apiParam finalUnit Datapoints's finalUnit.
 * @apiParam keyIssueId Datapoints's keyIssueId.
 * @apiParam functionId Datapoints's functionId.
 * @apiParam dpType Datapoints's dpType.
 * @apiParam year Datapoints's year.
 * @apiParam companyTaxonomyId Datapoints's companyTaxonomyId.
 * @apiParam dpStatus Datapoints's dpStatus.
 * @apiParam sourceName Datapoints's sourceName.
 * @apiParam sourceUrl Datapoints's sourceUrl.
 * @apiParam sourcePublicationDate Datapoints's sourcePublicationDate.
 * @apiParam pageNumber Datapoints's pageNumber.
 * @apiParam textSnippet Datapoints's textSnippet.
 * @apiParam screenshotType Datapoints's screenshotType.
 * @apiParam filePath Datapoints's filePath.
 * @apiParam status Datapoints's status.
 * @apiSuccess {Object} datapoints Datapoints's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Datapoints not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, code, description, dataCollection, unit, signal, percentile, finalUnit, keyIssueId, functionId, dpType, year, companyTaxonomyId, dpStatus, sourceName, sourceUrl, sourcePublicationDate, pageNumber, textSnippet, screenshotType, filePath, status }),
  update)

/**
 * @api {delete} /datapoints/:id Delete datapoints
 * @apiName DeleteDatapoints
 * @apiGroup Datapoints
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Datapoints not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
