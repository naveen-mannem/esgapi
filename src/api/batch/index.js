import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Batch, { schema } from './model'

const router = new Router()
const { batchName, batchSLA, status, createdBy, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /batch Create batch
 * @apiName CreateBatch
 * @apiGroup Batch
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam batchName Batch's batchName.
 * @apiParam batchSLA Batch's batchSLA.
 * @apiParam status Batch's status.
 * @apiParam createdBy Batch's createdBy.
 * @apiParam createdAt Batch's createdAt.
 * @apiParam updatedAt Batch's updatedAt.
 * @apiSuccess {Object} batch Batch's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Batch not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ batchName, batchSLA, status, createdBy, createdAt, updatedAt }),
  create)

/**
 * @api {get} /batch Retrieve batches
 * @apiName RetrieveBatches
 * @apiGroup Batch
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of batches.
 * @apiSuccess {Object[]} rows List of batches.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /batch/:id Retrieve batch
 * @apiName RetrieveBatch
 * @apiGroup Batch
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} batch Batch's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Batch not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /batch/:id Update batch
 * @apiName UpdateBatch
 * @apiGroup Batch
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam batchName Batch's batchName.
 * @apiParam batchSLA Batch's batchSLA.
 * @apiParam status Batch's status.
 * @apiParam createdBy Batch's createdBy.
 * @apiParam createdAt Batch's createdAt.
 * @apiParam updatedAt Batch's updatedAt.
 * @apiSuccess {Object} batch Batch's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Batch not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ batchName, batchSLA, status, createdBy, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /batch/:id Delete batch
 * @apiName DeleteBatch
 * @apiGroup Batch
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Batch not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
