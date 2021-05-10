import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export PolarityRule, { schema } from './model'

const router = new Router()
const { polarityName, polarityValue, condition, datapointId, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /polarityRule Create polarity rule
 * @apiName CreatePolarityRule
 * @apiGroup PolarityRule
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam polarityName Polarity rule's polarityName.
 * @apiParam polarityValue Polarity rule's polarityValue.
 * @apiParam condition Polarity rule's condition.
 * @apiParam datapointId Polarity rule's datapointId.
 * @apiParam status Polarity rule's status.
 * @apiParam createdAt Polarity rule's createdAt.
 * @apiParam updatedAt Polarity rule's updatedAt.
 * @apiSuccess {Object} polarityRule Polarity rule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Polarity rule not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ polarityName, polarityValue, condition, datapointId, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /polarityRule Retrieve polarity rules
 * @apiName RetrievePolarityRules
 * @apiGroup PolarityRule
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of polarity rules.
 * @apiSuccess {Object[]} rows List of polarity rules.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /polarityRule/:id Retrieve polarity rule
 * @apiName RetrievePolarityRule
 * @apiGroup PolarityRule
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} polarityRule Polarity rule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Polarity rule not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /polarityRule/:id Update polarity rule
 * @apiName UpdatePolarityRule
 * @apiGroup PolarityRule
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam polarityName Polarity rule's polarityName.
 * @apiParam polarityValue Polarity rule's polarityValue.
 * @apiParam condition Polarity rule's condition.
 * @apiParam datapointId Polarity rule's datapointId.
 * @apiParam status Polarity rule's status.
 * @apiParam createdAt Polarity rule's createdAt.
 * @apiParam updatedAt Polarity rule's updatedAt.
 * @apiSuccess {Object} polarityRule Polarity rule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Polarity rule not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ polarityName, polarityValue, condition, datapointId, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /polarityRule/:id Delete polarity rule
 * @apiName DeletePolarityRule
 * @apiGroup PolarityRule
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Polarity rule not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
