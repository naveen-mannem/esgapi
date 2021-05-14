import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export PolarityRule, { schema } from './model'

const router = new Router()
const { polarityName, polarityValue, condition, datapointId, status } = schema.tree

/**
 * @api {post} /polarityRules Create polarity rule
 * @apiName CreatePolarityRule
 * @apiGroup PolarityRule
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam polarityName Polarity rule's polarityName.
 * @apiParam polarityValue Polarity rule's polarityValue.
 * @apiParam condition Polarity rule's condition.
 * @apiParam datapointId Polarity rule's datapointId.
 * @apiSuccess {Object} polarityRule Polarity rule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Polarity rule not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ polarityName, polarityValue, condition, datapointId }),
  create)

/**
 * @api {get} /polarityRules Retrieve polarity rules
 * @apiName RetrievePolarityRules
 * @apiGroup PolarityRule
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of polarity rules.
 * @apiSuccess {Object[]} rows List of polarity rules.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /polarityRules/:id Retrieve polarity rule
 * @apiName RetrievePolarityRule
 * @apiGroup PolarityRule
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} polarityRule Polarity rule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Polarity rule not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /polarityRules/:id Update polarity rule
 * @apiName UpdatePolarityRule
 * @apiGroup PolarityRule
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam polarityName Polarity rule's polarityName.
 * @apiParam polarityValue Polarity rule's polarityValue.
 * @apiParam condition Polarity rule's condition.
 * @apiParam datapointId Polarity rule's datapointId.
 * @apiParam status Polarity rule's status.
 * @apiSuccess {Object} polarityRule Polarity rule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Polarity rule not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ polarityName, polarityValue, condition, datapointId, status }),
  update)

/**
 * @api {delete} /polarityRules/:id Delete polarity rule
 * @apiName DeletePolarityRule
 * @apiGroup PolarityRule
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Polarity rule not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
