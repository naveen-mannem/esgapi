import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Controversy, { schema } from './model'

const router = new Router()
const { dpCodeId, companyId, year, sourceName, sourceUrl, sourcePublicationDate, activeStatus, submittedBy, submittedDate, response,status } = schema.tree

/**
 * @api {post} /controversies Create controversy
 * @apiName CreateControversy
 * @apiGroup Controversy
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam dpCodeId Controversy's dpCodeId.
 * @apiParam companyId Controversy's companyId.
 * @apiParam year Controversy's year.
 * @apiParam sourceName Controversy's sourceName.
 * @apiParam sourceUrl Controversy's sourceUrl.
 * @apiParam sourcePublicationDate Controversy's sourcePublicationDate.
 * @apiParam activeStatus Controversy's activeStatus.
 * @apiParam submittedBy Controversy's submittedBy.
 * @apiParam submittedDate Controversy's submittedDate.
 * @apiParam response Controversy's response.
 * @apiSuccess {Object} controversy Controversy's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Controversy not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ dpCodeId, companyId, year, sourceName, sourceUrl, sourcePublicationDate, activeStatus, submittedBy, submittedDate, response }),
  create)

/**
 * @api {get} /controversies Retrieve controversies
 * @apiName RetrieveControversies
 * @apiGroup Controversy
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of controversies.
 * @apiSuccess {Object[]} rows List of controversies.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /controversies/:id Retrieve controversy
 * @apiName RetrieveControversy
 * @apiGroup Controversy
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} controversy Controversy's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Controversy not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /controversies/:id Update controversy
 * @apiName UpdateControversy
 * @apiGroup Controversy
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam dpCodeId Controversy's dpCodeId.
 * @apiParam companyId Controversy's companyId.
 * @apiParam year Controversy's year.
 * @apiParam sourceName Controversy's sourceName.
 * @apiParam sourceUrl Controversy's sourceUrl.
 * @apiParam sourcePublicationDate Controversy's sourcePublicationDate.
 * @apiParam activeStatus Controversy's activeStatus.
 * @apiParam submittedBy Controversy's submittedBy.
 * @apiParam submittedDate Controversy's submittedDate.
 * @apiParam response Controversy's response.
 * @apiSuccess {Object} controversy Controversy's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Controversy not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ dpCodeId, companyId, year, sourceName, sourceUrl, sourcePublicationDate, activeStatus, submittedBy, submittedDate, response ,status}),
  update)

/**
 * @api {delete} /controversies/:id Delete controversy
 * @apiName DeleteControversy
 * @apiGroup Controversy
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Controversy not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
