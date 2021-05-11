import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Group, { schema } from './model'

const router = new Router()
const { groupName, groupAdmin, batchId, status } = schema.tree

/**
 * @api {post} /groups Create group
 * @apiName CreateGroup
 * @apiGroup Group
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam groupName Group's groupName.
 * @apiParam groupAdmin Group's groupAdmin.
 * @apiParam batchId Group's batchId.
 * @apiSuccess {Object} group Group's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ groupName, groupAdmin, batchId}),
  create)

/**
 * @api {get} /groups Retrieve groups
 * @apiName RetrieveGroups
 * @apiGroup Group
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of groups.
 * @apiSuccess {Object[]} rows List of groups.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /groups/:id Retrieve group
 * @apiName RetrieveGroup
 * @apiGroup Group
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} group Group's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /groups/:id Update group
 * @apiName UpdateGroup
 * @apiGroup Group
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam groupName Group's groupName.
 * @apiParam groupAdmin Group's groupAdmin.
 * @apiParam batchId Group's batchId.
 * @apiParam status Group's status.
 * @apiSuccess {Object} group Group's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ groupName, groupAdmin, batchId, status }),
  update)

/**
 * @api {delete} /groups/:id Delete group
 * @apiName DeleteGroup
 * @apiGroup Group
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Group not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
