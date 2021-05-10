import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export BoardMatrixDatapoints, { schema } from './model'

const router = new Router()
const { dpCodeId, boardMemberId, year, response, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /boardMatrixDatapoints Create board matrix datapoints
 * @apiName CreateBoardMatrixDatapoints
 * @apiGroup BoardMatrixDatapoints
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam dpCodeId Board matrix datapoints's dpCodeId.
 * @apiParam boardMemberId Board matrix datapoints's boardMemberId.
 * @apiParam year Board matrix datapoints's year.
 * @apiParam response Board matrix datapoints's response.
 * @apiParam status Board matrix datapoints's status.
 * @apiParam createdAt Board matrix datapoints's createdAt.
 * @apiParam updatedAt Board matrix datapoints's updatedAt.
 * @apiSuccess {Object} boardMatrixDatapoints Board matrix datapoints's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board matrix datapoints not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ dpCodeId, boardMemberId, year, response, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /boardMatrixDatapoints Retrieve board matrix datapoints
 * @apiName RetrieveBoardMatrixDatapoints
 * @apiGroup BoardMatrixDatapoints
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of board matrix datapoints.
 * @apiSuccess {Object[]} rows List of board matrix datapoints.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /boardMatrixDatapoints/:id Retrieve board matrix datapoints
 * @apiName RetrieveBoardMatrixDatapoints
 * @apiGroup BoardMatrixDatapoints
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} boardMatrixDatapoints Board matrix datapoints's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board matrix datapoints not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /boardMatrixDatapoints/:id Update board matrix datapoints
 * @apiName UpdateBoardMatrixDatapoints
 * @apiGroup BoardMatrixDatapoints
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam dpCodeId Board matrix datapoints's dpCodeId.
 * @apiParam boardMemberId Board matrix datapoints's boardMemberId.
 * @apiParam year Board matrix datapoints's year.
 * @apiParam response Board matrix datapoints's response.
 * @apiParam status Board matrix datapoints's status.
 * @apiParam createdAt Board matrix datapoints's createdAt.
 * @apiParam updatedAt Board matrix datapoints's updatedAt.
 * @apiSuccess {Object} boardMatrixDatapoints Board matrix datapoints's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board matrix datapoints not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ dpCodeId, boardMemberId, year, response, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /boardMatrixDatapoints/:id Delete board matrix datapoints
 * @apiName DeleteBoardMatrixDatapoints
 * @apiGroup BoardMatrixDatapoints
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Board matrix datapoints not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
