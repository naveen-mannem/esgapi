import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Role, { schema } from './model'

const router = new Router()
const { roleName, roleCode, status, createdBy, createdAt } = schema.tree

/**
 * @api {post} /role Create role
 * @apiName CreateRole
 * @apiGroup Role
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam roleName Role's roleName.
 * @apiParam roleCode Role's roleCode.
 * @apiParam status Role's status.
 * @apiParam createdBy Role's createdBy.
 * @apiParam createdAt Role's createdAt.
 * @apiSuccess {Object} role Role's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ roleName, roleCode, status, createdBy, createdAt }),
  create)

/**
 * @api {get} /role Retrieve roles
 * @apiName RetrieveRoles
 * @apiGroup Role
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of roles.
 * @apiSuccess {Object[]} rows List of roles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /role/:id Retrieve role
 * @apiName RetrieveRole
 * @apiGroup Role
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} role Role's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /role/:id Update role
 * @apiName UpdateRole
 * @apiGroup Role
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam roleName Role's roleName.
 * @apiParam roleCode Role's roleCode.
 * @apiParam status Role's status.
 * @apiParam createdBy Role's createdBy.
 * @apiParam createdAt Role's createdAt.
 * @apiSuccess {Object} role Role's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ roleName, roleCode, status, createdBy, createdAt }),
  update)

/**
 * @api {delete} /role/:id Delete role
 * @apiName DeleteRole
 * @apiGroup Role
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
