import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export TaskAssignment, { schema } from './model'

const router = new Router()
const { companyId, categoryId, groupId, revisionCode, assignedTo, year, analystSLA, taskStatus, analystId, qaId, status } = schema.tree

/**
 * @api {post} /taskAssignments Create task assignment
 * @apiName CreateTaskAssignment
 * @apiGroup TaskAssignment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam companyId Task assignment's companyId.
 * @apiParam categoryId Task assignment's categoryId.
 * @apiParam groupId Task assignment's groupId.
 * @apiParam revisionCode Task assignment's revisionCode.
 * @apiParam assignedTo Task assignment's assignedTo.
 * @apiParam year Task assignment's year.
 * @apiParam analystSLA Task assignment's analystSLA.
 * @apiParam taskStatus Task assignment's taskStatus.
 * @apiParam analystId Task assignment's analystId.
 * @apiParam qaId Task assignment's qaId.
 * @apiSuccess {Object} taskAssignment Task assignment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task assignment not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ companyId, categoryId, groupId, revisionCode, assignedTo, year, analystSLA, taskStatus, analystId, qaId }),
  create)

/**
 * @api {get} /taskAssignments Retrieve task assignments
 * @apiName RetrieveTaskAssignments
 * @apiGroup TaskAssignment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of task assignments.
 * @apiSuccess {Object[]} rows List of task assignments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /taskAssignments/:id Retrieve task assignment
 * @apiName RetrieveTaskAssignment
 * @apiGroup TaskAssignment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} taskAssignment Task assignment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task assignment not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /taskAssignments/:id Update task assignment
 * @apiName UpdateTaskAssignment
 * @apiGroup TaskAssignment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam companyId Task assignment's companyId.
 * @apiParam categoryId Task assignment's categoryId.
 * @apiParam groupId Task assignment's groupId.
 * @apiParam revisionCode Task assignment's revisionCode.
 * @apiParam assignedTo Task assignment's assignedTo.
 * @apiParam year Task assignment's year.
 * @apiParam analystSLA Task assignment's analystSLA.
 * @apiParam taskStatus Task assignment's taskStatus.
 * @apiParam analystId Task assignment's analystId.
 * @apiParam qaId Task assignment's qaId.
 * @apiParam status Task assignment's status.
 * @apiSuccess {Object} taskAssignment Task assignment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task assignment not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ companyId, categoryId, groupId, revisionCode, assignedTo, year, analystSLA, taskStatus, analystId, qaId, status }),
  update)

/**
 * @api {delete} /taskAssignments/:id Delete task assignment
 * @apiName DeleteTaskAssignment
 * @apiGroup TaskAssignment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Task assignment not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
