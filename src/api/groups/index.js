import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Groups, { schema } from './model'

const router = new Router()
const { groupName, groupAdmin, batchId, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /groups Create groups
 * @apiName CreateGroups
 * @apiGroup Groups
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam groupName Groups's groupName.
 * @apiParam groupAdmin Groups's groupAdmin.
 * @apiParam batchId Groups's batchId.
 * @apiParam status Groups's status.
 * @apiParam createdAt Groups's createdAt.
 * @apiParam updatedAt Groups's updatedAt.
 * @apiSuccess {Object} groups Groups's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Groups not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ groupName, groupAdmin, batchId, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /groups Retrieve groups
 * @apiName RetrieveGroups
 * @apiGroup Groups
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of groups.
 * @apiSuccess {Object[]} rows List of groups.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /groups/:id Retrieve groups
 * @apiName RetrieveGroups
 * @apiGroup Groups
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} groups Groups's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Groups not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /groups/:id Update groups
 * @apiName UpdateGroups
 * @apiGroup Groups
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam groupName Groups's groupName.
 * @apiParam groupAdmin Groups's groupAdmin.
 * @apiParam batchId Groups's batchId.
 * @apiParam status Groups's status.
 * @apiParam createdAt Groups's createdAt.
 * @apiParam updatedAt Groups's updatedAt.
 * @apiSuccess {Object} groups Groups's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Groups not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ groupName, groupAdmin, batchId, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /groups/:id Delete groups
 * @apiName DeleteGroups
 * @apiGroup Groups
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Groups not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
