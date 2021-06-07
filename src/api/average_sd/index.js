import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export AverageSd, { schema } from './model'

const router = new Router()
const { companyId, year, stdDeviation, status } = schema.tree

/**
 * @api {post} /average_sd Create average sd
 * @apiName CreateAverageSd
 * @apiGroup AverageSd
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam companyId Average sd's companyId.
 * @apiParam year Average sd's year.
 * @apiParam stdDeviation Average sd's stdDeviation.
 * @apiParam status Average sd's status.
 * @apiSuccess {Object} averageSd Average sd's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Average sd not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ companyId, year, stdDeviation, status }),
  create)

/**
 * @api {get} /average_sd Retrieve average sds
 * @apiName RetrieveAverageSds
 * @apiGroup AverageSd
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of average sds.
 * @apiSuccess {Object[]} rows List of average sds.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /average_sd/:id Retrieve average sd
 * @apiName RetrieveAverageSd
 * @apiGroup AverageSd
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} averageSd Average sd's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Average sd not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /average_sd/:id Update average sd
 * @apiName UpdateAverageSd
 * @apiGroup AverageSd
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam companyId Average sd's companyId.
 * @apiParam year Average sd's year.
 * @apiParam stdDeviation Average sd's stdDeviation.
 * @apiParam status Average sd's status.
 * @apiSuccess {Object} averageSd Average sd's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Average sd not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ companyId, year, stdDeviation, status }),
  update)

/**
 * @api {delete} /average_sd/:id Delete average sd
 * @apiName DeleteAverageSd
 * @apiGroup AverageSd
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Average sd not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
