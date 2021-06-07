import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Ztables, { schema } from './model'

const router = new Router()
const { zScore, values, status } = schema.tree

/**
 * @api {post} /ztables Create ztables
 * @apiName CreateZtables
 * @apiGroup Ztables
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam zScore Ztables's zScore.
 * @apiParam values Ztables's values.
 * @apiSuccess {Object} ztables Ztables's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ztables not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ zScore, values }),
  create)

/**
 * @api {get} /ztables Retrieve ztables
 * @apiName RetrieveZtables
 * @apiGroup Ztables
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of ztables.
 * @apiSuccess {Object[]} rows List of ztables.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /ztables/:id Retrieve ztables
 * @apiName RetrieveZtables
 * @apiGroup Ztables
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ztables Ztables's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ztables not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /ztables/:id Update ztables
 * @apiName UpdateZtables
 * @apiGroup Ztables
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam zScore Ztables's zScore.
 * @apiParam values Ztables's values.
 * @apiParam status Ztables's status.
 * @apiSuccess {Object} ztables Ztables's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ztables not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ zScore, values, status }),
  update)

/**
 * @api {delete} /ztables/:id Delete ztables
 * @apiName DeleteZtables
 * @apiGroup Ztables
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Ztables not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
