import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export KmpMatrixDataPoints, { schema } from './model'

const router = new Router()
const { kmpId, dpCodeId, response, year, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /kmpMatrixDataPoints Create kmp matrix data points
 * @apiName CreateKmpMatrixDataPoints
 * @apiGroup KmpMatrixDataPoints
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam kmpId Kmp matrix data points's kmpId.
 * @apiParam dpCodeId Kmp matrix data points's dpCodeId.
 * @apiParam response Kmp matrix data points's response.
 * @apiParam year Kmp matrix data points's year.
 * @apiParam status Kmp matrix data points's status.
 * @apiParam createdAt Kmp matrix data points's createdAt.
 * @apiParam updatedAt Kmp matrix data points's updatedAt.
 * @apiSuccess {Object} kmpMatrixDataPoints Kmp matrix data points's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kmp matrix data points not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ kmpId, dpCodeId, response, year, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /kmpMatrixDataPoints Retrieve kmp matrix data points
 * @apiName RetrieveKmpMatrixDataPoints
 * @apiGroup KmpMatrixDataPoints
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of kmp matrix data points.
 * @apiSuccess {Object[]} rows List of kmp matrix data points.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /kmpMatrixDataPoints/:id Retrieve kmp matrix data points
 * @apiName RetrieveKmpMatrixDataPoints
 * @apiGroup KmpMatrixDataPoints
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} kmpMatrixDataPoints Kmp matrix data points's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kmp matrix data points not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /kmpMatrixDataPoints/:id Update kmp matrix data points
 * @apiName UpdateKmpMatrixDataPoints
 * @apiGroup KmpMatrixDataPoints
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam kmpId Kmp matrix data points's kmpId.
 * @apiParam dpCodeId Kmp matrix data points's dpCodeId.
 * @apiParam response Kmp matrix data points's response.
 * @apiParam year Kmp matrix data points's year.
 * @apiParam status Kmp matrix data points's status.
 * @apiParam createdAt Kmp matrix data points's createdAt.
 * @apiParam updatedAt Kmp matrix data points's updatedAt.
 * @apiSuccess {Object} kmpMatrixDataPoints Kmp matrix data points's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kmp matrix data points not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ kmpId, dpCodeId, response, year, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /kmpMatrixDataPoints/:id Delete kmp matrix data points
 * @apiName DeleteKmpMatrixDataPoints
 * @apiGroup KmpMatrixDataPoints
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Kmp matrix data points not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
