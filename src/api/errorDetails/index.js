import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export ErrorDetails, { schema } from './model'

const router = new Router()
const { errorTypeId, taskId, loggedBy, comments, errorLoggedDate, errorStatus, standAlonId, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /errorDetails Create error details
 * @apiName CreateErrorDetails
 * @apiGroup ErrorDetails
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam errorTypeId Error details's errorTypeId.
 * @apiParam taskId Error details's taskId.
 * @apiParam loggedBy Error details's loggedBy.
 * @apiParam comments Error details's comments.
 * @apiParam errorLoggedDate Error details's errorLoggedDate.
 * @apiParam errorStatus Error details's errorStatus.
 * @apiParam standAlonId Error details's standAlonId.
 * @apiParam status Error details's status.
 * @apiParam createdAt Error details's createdAt.
 * @apiParam updatedAt Error details's updatedAt.
 * @apiSuccess {Object} errorDetails Error details's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Error details not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ errorTypeId, taskId, loggedBy, comments, errorLoggedDate, errorStatus, standAlonId, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /errorDetails Retrieve error details
 * @apiName RetrieveErrorDetails
 * @apiGroup ErrorDetails
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of error details.
 * @apiSuccess {Object[]} rows List of error details.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /errorDetails/:id Retrieve error details
 * @apiName RetrieveErrorDetails
 * @apiGroup ErrorDetails
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} errorDetails Error details's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Error details not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /errorDetails/:id Update error details
 * @apiName UpdateErrorDetails
 * @apiGroup ErrorDetails
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam errorTypeId Error details's errorTypeId.
 * @apiParam taskId Error details's taskId.
 * @apiParam loggedBy Error details's loggedBy.
 * @apiParam comments Error details's comments.
 * @apiParam errorLoggedDate Error details's errorLoggedDate.
 * @apiParam errorStatus Error details's errorStatus.
 * @apiParam standAlonId Error details's standAlonId.
 * @apiParam status Error details's status.
 * @apiParam createdAt Error details's createdAt.
 * @apiParam updatedAt Error details's updatedAt.
 * @apiSuccess {Object} errorDetails Error details's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Error details not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ errorTypeId, taskId, loggedBy, comments, errorLoggedDate, errorStatus, standAlonId, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /errorDetails/:id Delete error details
 * @apiName DeleteErrorDetails
 * @apiGroup ErrorDetails
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Error details not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
