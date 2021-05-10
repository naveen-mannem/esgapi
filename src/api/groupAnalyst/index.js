import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export GroupAnalyst, { schema } from './model'

const router = new Router()
const { userId, groupId, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /groupAnalyst Create group analyst
 * @apiName CreateGroupAnalyst
 * @apiGroup GroupAnalyst
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam userId Group analyst's userId.
 * @apiParam groupId Group analyst's groupId.
 * @apiParam status Group analyst's status.
 * @apiParam createdAt Group analyst's createdAt.
 * @apiParam updatedAt Group analyst's updatedAt.
 * @apiSuccess {Object} groupAnalyst Group analyst's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group analyst not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ userId, groupId, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /groupAnalyst Retrieve group analysts
 * @apiName RetrieveGroupAnalysts
 * @apiGroup GroupAnalyst
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of group analysts.
 * @apiSuccess {Object[]} rows List of group analysts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /groupAnalyst/:id Retrieve group analyst
 * @apiName RetrieveGroupAnalyst
 * @apiGroup GroupAnalyst
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} groupAnalyst Group analyst's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group analyst not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /groupAnalyst/:id Update group analyst
 * @apiName UpdateGroupAnalyst
 * @apiGroup GroupAnalyst
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam userId Group analyst's userId.
 * @apiParam groupId Group analyst's groupId.
 * @apiParam status Group analyst's status.
 * @apiParam createdAt Group analyst's createdAt.
 * @apiParam updatedAt Group analyst's updatedAt.
 * @apiSuccess {Object} groupAnalyst Group analyst's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group analyst not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ userId, groupId, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /groupAnalyst/:id Delete group analyst
 * @apiName DeleteGroupAnalyst
 * @apiGroup GroupAnalyst
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Group analyst not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
