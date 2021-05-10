import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export TaskAssignment, { schema } from './model'

const router = new Router()
const { companyId, categoryId, groupId, revisionCode, assignedTo, year, analystSLA, taskStatus, analystEmail, qaEmail, qaSLA, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /taskAssignment Create task assignment
 * @apiName CreateTaskAssignment
 * @apiGroup TaskAssignment
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam companyId Task assignment's companyId.
 * @apiParam categoryId Task assignment's categoryId.
 * @apiParam groupId Task assignment's groupId.
 * @apiParam revisionCode Task assignment's revisionCode.
 * @apiParam assignedTo Task assignment's assignedTo.
 * @apiParam year Task assignment's year.
 * @apiParam analystSLA Task assignment's analystSLA.
 * @apiParam taskStatus Task assignment's taskStatus.
 * @apiParam analystEmail Task assignment's analystEmail.
 * @apiParam qaEmail Task assignment's qaEmail.
 * @apiParam qaSLA Task assignment's qaSLA.
 * @apiParam status Task assignment's status.
 * @apiParam createdAt Task assignment's createdAt.
 * @apiParam updatedAt Task assignment's updatedAt.
 * @apiSuccess {Object} taskAssignment Task assignment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task assignment not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ companyId, categoryId, groupId, revisionCode, assignedTo, year, analystSLA, taskStatus, analystEmail, qaEmail, qaSLA, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /taskAssignment Retrieve task assignments
 * @apiName RetrieveTaskAssignments
 * @apiGroup TaskAssignment
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of task assignments.
 * @apiSuccess {Object[]} rows List of task assignments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /taskAssignment/:id Retrieve task assignment
 * @apiName RetrieveTaskAssignment
 * @apiGroup TaskAssignment
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} taskAssignment Task assignment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task assignment not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /taskAssignment/:id Update task assignment
 * @apiName UpdateTaskAssignment
 * @apiGroup TaskAssignment
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam companyId Task assignment's companyId.
 * @apiParam categoryId Task assignment's categoryId.
 * @apiParam groupId Task assignment's groupId.
 * @apiParam revisionCode Task assignment's revisionCode.
 * @apiParam assignedTo Task assignment's assignedTo.
 * @apiParam year Task assignment's year.
 * @apiParam analystSLA Task assignment's analystSLA.
 * @apiParam taskStatus Task assignment's taskStatus.
 * @apiParam analystEmail Task assignment's analystEmail.
 * @apiParam qaEmail Task assignment's qaEmail.
 * @apiParam qaSLA Task assignment's qaSLA.
 * @apiParam status Task assignment's status.
 * @apiParam createdAt Task assignment's createdAt.
 * @apiParam updatedAt Task assignment's updatedAt.
 * @apiSuccess {Object} taskAssignment Task assignment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task assignment not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ companyId, categoryId, groupId, revisionCode, assignedTo, year, analystSLA, taskStatus, analystEmail, qaEmail, qaSLA, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /taskAssignment/:id Delete task assignment
 * @apiName DeleteTaskAssignment
 * @apiGroup TaskAssignment
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Task assignment not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
