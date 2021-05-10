import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Error, { schema } from './model'

const router = new Router()
const { errorTypeName, errorBucket, errorDefinition, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /error Create error
 * @apiName CreateError
 * @apiGroup Error
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam errorTypeName Error's errorTypeName.
 * @apiParam errorBucket Error's errorBucket.
 * @apiParam errorDefinition Error's errorDefinition.
 * @apiParam status Error's status.
 * @apiParam createdAt Error's createdAt.
 * @apiParam updatedAt Error's updatedAt.
 * @apiSuccess {Object} error Error's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Error not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ errorTypeName, errorBucket, errorDefinition, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /error Retrieve errors
 * @apiName RetrieveErrors
 * @apiGroup Error
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of errors.
 * @apiSuccess {Object[]} rows List of errors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /error/:id Retrieve error
 * @apiName RetrieveError
 * @apiGroup Error
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} error Error's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Error not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /error/:id Update error
 * @apiName UpdateError
 * @apiGroup Error
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam errorTypeName Error's errorTypeName.
 * @apiParam errorBucket Error's errorBucket.
 * @apiParam errorDefinition Error's errorDefinition.
 * @apiParam status Error's status.
 * @apiParam createdAt Error's createdAt.
 * @apiParam updatedAt Error's updatedAt.
 * @apiSuccess {Object} error Error's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Error not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ errorTypeName, errorBucket, errorDefinition, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /error/:id Delete error
 * @apiName DeleteError
 * @apiGroup Error
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Error not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
