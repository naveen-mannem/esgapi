import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export GroupQa, { schema } from './model'

const router = new Router()
const { userId, groupId, status } = schema.tree

/**
 * @api {post} /groupQAS Create group qa
 * @apiName CreateGroupQa
 * @apiGroup GroupQa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam userId Group qa's userId.
 * @apiParam groupId Group qa's groupId.
 * @apiSuccess {Object} groupQa Group qa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group qa not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ userId, groupId }),
  create)

/**
 * @api {get} /groupQAS Retrieve group qas
 * @apiName RetrieveGroupQas
 * @apiGroup GroupQa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of group qas.
 * @apiSuccess {Object[]} rows List of group qas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /groupQAS/:id Retrieve group qa
 * @apiName RetrieveGroupQa
 * @apiGroup GroupQa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} groupQa Group qa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group qa not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /groupQAS/:id Update group qa
 * @apiName UpdateGroupQa
 * @apiGroup GroupQa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam userId Group qa's userId.
 * @apiParam groupId Group qa's groupId.
 * @apiParam status Group qa's status.
 * @apiSuccess {Object} groupQa Group qa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group qa not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ userId, groupId, status }),
  update)

/**
 * @api {delete} /groupQAS/:id Delete group qa
 * @apiName DeleteGroupQa
 * @apiGroup GroupQa
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Group qa not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
