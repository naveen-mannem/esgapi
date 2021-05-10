import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export TaskSlaLog, { schema } from './model'

const router = new Router()
const { taskId, currentDate, preferredDate, loggedBy, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /taskSLALog Create task sla log
 * @apiName CreateTaskSlaLog
 * @apiGroup TaskSlaLog
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam taskId Task sla log's taskId.
 * @apiParam currentDate Task sla log's currentDate.
 * @apiParam preferredDate Task sla log's preferredDate.
 * @apiParam loggedBy Task sla log's loggedBy.
 * @apiParam status Task sla log's status.
 * @apiParam createdAt Task sla log's createdAt.
 * @apiParam updatedAt Task sla log's updatedAt.
 * @apiSuccess {Object} taskSlaLog Task sla log's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task sla log not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ taskId, currentDate, preferredDate, loggedBy, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /taskSLALog Retrieve task sla logs
 * @apiName RetrieveTaskSlaLogs
 * @apiGroup TaskSlaLog
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of task sla logs.
 * @apiSuccess {Object[]} rows List of task sla logs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /taskSLALog/:id Retrieve task sla log
 * @apiName RetrieveTaskSlaLog
 * @apiGroup TaskSlaLog
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} taskSlaLog Task sla log's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task sla log not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /taskSLALog/:id Update task sla log
 * @apiName UpdateTaskSlaLog
 * @apiGroup TaskSlaLog
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam taskId Task sla log's taskId.
 * @apiParam currentDate Task sla log's currentDate.
 * @apiParam preferredDate Task sla log's preferredDate.
 * @apiParam loggedBy Task sla log's loggedBy.
 * @apiParam status Task sla log's status.
 * @apiParam createdAt Task sla log's createdAt.
 * @apiParam updatedAt Task sla log's updatedAt.
 * @apiSuccess {Object} taskSlaLog Task sla log's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task sla log not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ taskId, currentDate, preferredDate, loggedBy, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /taskSLALog/:id Delete task sla log
 * @apiName DeleteTaskSlaLog
 * @apiGroup TaskSlaLog
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Task sla log not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
