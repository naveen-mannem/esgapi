import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export BoardMembers, { schema } from './model'

const router = new Router()
const { companyId, boardMemberName, memberStatus, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /boardMembers Create board members
 * @apiName CreateBoardMembers
 * @apiGroup BoardMembers
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam companyId Board members's companyId.
 * @apiParam boardMemberName Board members's boardMemberName.
 * @apiParam memberStatus Board members's memberStatus.
 * @apiParam status Board members's status.
 * @apiParam createdAt Board members's createdAt.
 * @apiParam updatedAt Board members's updatedAt.
 * @apiSuccess {Object} boardMembers Board members's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board members not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ companyId, boardMemberName, memberStatus, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /boardMembers Retrieve board members
 * @apiName RetrieveBoardMembers
 * @apiGroup BoardMembers
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of board members.
 * @apiSuccess {Object[]} rows List of board members.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /boardMembers/:id Retrieve board members
 * @apiName RetrieveBoardMembers
 * @apiGroup BoardMembers
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} boardMembers Board members's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board members not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /boardMembers/:id Update board members
 * @apiName UpdateBoardMembers
 * @apiGroup BoardMembers
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam companyId Board members's companyId.
 * @apiParam boardMemberName Board members's boardMemberName.
 * @apiParam memberStatus Board members's memberStatus.
 * @apiParam status Board members's status.
 * @apiParam createdAt Board members's createdAt.
 * @apiParam updatedAt Board members's updatedAt.
 * @apiSuccess {Object} boardMembers Board members's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board members not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ companyId, boardMemberName, memberStatus, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /boardMembers/:id Delete board members
 * @apiName DeleteBoardMembers
 * @apiGroup BoardMembers
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Board members not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
