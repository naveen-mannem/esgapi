import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Batches, { schema } from './model'

const router = new Router()
const { batchName, batchSLA, status,companyId } = schema.tree

/**
 * @api {post} /batches Create batches
 * @apiName CreateBatches
 * @apiGroup Batches
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam batchName Batches's batchName.
 * @apiParam batchSLA Batches's batchSLA.
 * @apiSuccess {Object} batches Batches's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Batches not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ batchName, batchSLA ,companyId}),
  create)

/**
 * @api {get} /batches Retrieve batches
 * @apiName RetrieveBatches
 * @apiGroup Batches
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of batches.
 * @apiSuccess {Object[]} rows List of batches.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /batches/:id Retrieve batches
 * @apiName RetrieveBatches
 * @apiGroup Batches
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} batches Batches's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Batches not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /batches/:id Update batches
 * @apiName UpdateBatches
 * @apiGroup Batches
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam batchName Batches's batchName.
 * @apiParam batchSLA Batches's batchSLA.
 * @apiParam status Batches's status.
 * @apiSuccess {Object} batches Batches's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Batches not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ batchName, batchSLA, status ,companyId}),
  update)

/**
 * @api {delete} /batches/:id Delete batches
 * @apiName DeleteBatches
 * @apiGroup Batches
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Batches not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
