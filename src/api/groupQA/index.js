import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export GroupQa, { schema } from './model'

const router = new Router()
const { userId, groupId, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /groupQA Create group qa
 * @apiName CreateGroupQa
 * @apiGroup GroupQa
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam userId Group qa's userId.
 * @apiParam groupId Group qa's groupId.
 * @apiParam status Group qa's status.
 * @apiParam createdAt Group qa's createdAt.
 * @apiParam updatedAt Group qa's updatedAt.
 * @apiSuccess {Object} groupQa Group qa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group qa not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ userId, groupId, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /groupQA Retrieve group qas
 * @apiName RetrieveGroupQas
 * @apiGroup GroupQa
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of group qas.
 * @apiSuccess {Object[]} rows List of group qas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /groupQA/:id Retrieve group qa
 * @apiName RetrieveGroupQa
 * @apiGroup GroupQa
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} groupQa Group qa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group qa not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /groupQA/:id Update group qa
 * @apiName UpdateGroupQa
 * @apiGroup GroupQa
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam userId Group qa's userId.
 * @apiParam groupId Group qa's groupId.
 * @apiParam status Group qa's status.
 * @apiParam createdAt Group qa's createdAt.
 * @apiParam updatedAt Group qa's updatedAt.
 * @apiSuccess {Object} groupQa Group qa's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group qa not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ userId, groupId, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /groupQA/:id Delete group qa
 * @apiName DeleteGroupQa
 * @apiGroup GroupQa
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Group qa not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
