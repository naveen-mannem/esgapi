import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Controversy, { schema } from './model'

const router = new Router()
const { dpCodeId, companyId, year, sourceName, sourceUrl, sourcePublicationDate, response, submittedDate, submittedBy, activeStatus, status, createdBy, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /controversy Create controversy
 * @apiName CreateControversy
 * @apiGroup Controversy
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam dpCodeId Controversy's dpCodeId.
 * @apiParam companyId Controversy's companyId.
 * @apiParam year Controversy's year.
 * @apiParam sourceName Controversy's sourceName.
 * @apiParam sourceUrl Controversy's sourceUrl.
 * @apiParam sourcePublicationDate Controversy's sourcePublicationDate.
 * @apiParam response Controversy's response.
 * @apiParam submittedDate Controversy's submittedDate.
 * @apiParam submittedBy Controversy's submittedBy.
 * @apiParam activeStatus Controversy's activeStatus.
 * @apiParam status Controversy's status.
 * @apiParam createdBy Controversy's createdBy.
 * @apiParam createdAt Controversy's createdAt.
 * @apiParam updatedAt Controversy's updatedAt.
 * @apiSuccess {Object} controversy Controversy's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Controversy not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ dpCodeId, companyId, year, sourceName, sourceUrl, sourcePublicationDate, response, submittedDate, submittedBy, activeStatus, status, createdBy, createdAt, updatedAt }),
  create)

/**
 * @api {get} /controversy Retrieve controversies
 * @apiName RetrieveControversies
 * @apiGroup Controversy
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of controversies.
 * @apiSuccess {Object[]} rows List of controversies.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /controversy/:id Retrieve controversy
 * @apiName RetrieveControversy
 * @apiGroup Controversy
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} controversy Controversy's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Controversy not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /controversy/:id Update controversy
 * @apiName UpdateControversy
 * @apiGroup Controversy
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam dpCodeId Controversy's dpCodeId.
 * @apiParam companyId Controversy's companyId.
 * @apiParam year Controversy's year.
 * @apiParam sourceName Controversy's sourceName.
 * @apiParam sourceUrl Controversy's sourceUrl.
 * @apiParam sourcePublicationDate Controversy's sourcePublicationDate.
 * @apiParam response Controversy's response.
 * @apiParam submittedDate Controversy's submittedDate.
 * @apiParam submittedBy Controversy's submittedBy.
 * @apiParam activeStatus Controversy's activeStatus.
 * @apiParam status Controversy's status.
 * @apiParam createdBy Controversy's createdBy.
 * @apiParam createdAt Controversy's createdAt.
 * @apiParam updatedAt Controversy's updatedAt.
 * @apiSuccess {Object} controversy Controversy's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Controversy not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ dpCodeId, companyId, year, sourceName, sourceUrl, sourcePublicationDate, response, submittedDate, submittedBy, activeStatus, status, createdBy, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /controversy/:id Delete controversy
 * @apiName DeleteControversy
 * @apiGroup Controversy
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Controversy not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
