import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export GroupAnalyst, { schema } from './model'

const router = new Router()
const { userId, groupId, status } = schema.tree

/**
 * @api {post} /groupAnalysts Create group analyst
 * @apiName CreateGroupAnalyst
 * @apiGroup GroupAnalyst
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam userId Group analyst's userId.
 * @apiParam groupId Group analyst's groupId.
 * @apiSuccess {Object} groupAnalyst Group analyst's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group analyst not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ userId, groupId}),
  create)

/**
 * @api {get} /groupAnalysts Retrieve group analysts
 * @apiName RetrieveGroupAnalysts
 * @apiGroup GroupAnalyst
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of group analysts.
 * @apiSuccess {Object[]} rows List of group analysts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /groupAnalysts/:id Retrieve group analyst
 * @apiName RetrieveGroupAnalyst
 * @apiGroup GroupAnalyst
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} groupAnalyst Group analyst's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group analyst not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /groupAnalysts/:id Update group analyst
 * @apiName UpdateGroupAnalyst
 * @apiGroup GroupAnalyst
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam userId Group analyst's userId.
 * @apiParam groupId Group analyst's groupId.
 * @apiParam status Group analyst's status.
 * @apiSuccess {Object} groupAnalyst Group analyst's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group analyst not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ userId, groupId, status }),
  update)

/**
 * @api {delete} /groupAnalysts/:id Delete group analyst
 * @apiName DeleteGroupAnalyst
 * @apiGroup GroupAnalyst
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Group analyst not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
