import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, percentileCalculation} from './controller'
import { schema } from './model'
import { get } from 'mongoose'
export PolarityRules, { schema } from './model'

const router = new Router()
const { polarityName, polarityValue, condition, datapointId, status } = schema.tree

/**
 * @api {post} /polarity_rules Create polarity rules
 * @apiName CreatePolarityRules
 * @apiGroup PolarityRules
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam polarityName Polarity rules's polarityName.
 * @apiParam polarityValue Polarity rules's polarityValue.
 * @apiParam condition Polarity rules's condition.
 * @apiParam datapointId Polarity rules's datapointId.
 * @apiParam status Polarity rules's status.
 * @apiSuccess {Object} polarityRules Polarity rules's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Polarity rules not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ polarityName, polarityValue, condition, datapointId }),
  create)

/**
 * @api {get} /polarity_rules Retrieve polarity rules
 * @apiName RetrievePolarityRules
 * @apiGroup PolarityRules
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
 * @api {get} /polarity_rules/:id Retrieve polarity rules
 * @apiName RetrievePolarityRules
 * @apiGroup PolarityRules
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} polarityRules Polarity rules's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Polarity rules not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {get} /polarity_rules/calculate_percentile/:nic Retrieve percentile calculation
 * @apiName PercentileCalculation
 * @apiGroup PolarityRules
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} polarityRules Polarity rules's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Polarity rules not found.
 * @apiError 401 user access only.
 */
router.get('/calculate_percentile/:nic',
  token({ required: true }),
  percentileCalculation)

/**
 * @api {put} /polarity_rules/:id Update polarity rules
 * @apiName UpdatePolarityRules
 * @apiGroup PolarityRules
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam polarityName Polarity rules's polarityName.
 * @apiParam polarityValue Polarity rules's polarityValue.
 * @apiParam condition Polarity rules's condition.
 * @apiParam datapointId Polarity rules's datapointId.
 * @apiParam status Polarity rules's status.
 * @apiSuccess {Object} polarityRules Polarity rules's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Polarity rules not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ polarityName, polarityValue, condition, datapointId, status }),
  update)

/**
 * @api {delete} /polarity_rules/:id Delete polarity rules
 * @apiName DeletePolarityRules
 * @apiGroup PolarityRules
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Polarity rules not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
