import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export BoardMembers, { schema } from './model'

const router = new Router()
const { companyId, boardMemberName, year, memberStatus, status } = schema.tree

/**
 * @api {post} /boardMembers Create board members
 * @apiName CreateBoardMembers
 * @apiGroup BoardMembers
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam companyId Board members's companyId.
 * @apiParam boardMemberName Board members's boardMemberName.
 * @apiParam year Board members's year.
 * @apiParam memberStatus Board members's memberStatus.
 * @apiSuccess {Object} boardMembers Board members's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board members not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ companyId, boardMemberName, year, memberStatus }),
  create)

/**
 * @api {get} /boardMembers Retrieve board members
 * @apiName RetrieveBoardMembers
 * @apiGroup BoardMembers
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of board members.
 * @apiSuccess {Object[]} rows List of board members.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /boardMembers/:id Retrieve board members
 * @apiName RetrieveBoardMembers
 * @apiGroup BoardMembers
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} boardMembers Board members's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board members not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /boardMembers/:id Update board members
 * @apiName UpdateBoardMembers
 * @apiGroup BoardMembers
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam companyId Board members's companyId.
 * @apiParam boardMemberName Board members's boardMemberName.
 * @apiParam year Board members's year.
 * @apiParam memberStatus Board members's memberStatus.
 * @apiParam status Board members's status.
 * @apiSuccess {Object} boardMembers Board members's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Board members not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ companyId, boardMemberName, year, memberStatus, status }),
  update)

/**
 * @api {delete} /boardMembers/:id Delete board members
 * @apiName DeleteBoardMembers
 * @apiGroup BoardMembers
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Board members not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
