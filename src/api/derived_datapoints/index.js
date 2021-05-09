import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export DerivedDatapoints, { schema } from './model'

const router = new Router()
const { companyId, datapointId, response, performanceResult, activeStatus, dpStatus, year, lastModifiedDate, status } = schema.tree

/**
 * @api {post} /derived_datapoints Create derived datapoints
 * @apiName CreateDerivedDatapoints
 * @apiGroup DerivedDatapoints
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam companyId Derived datapoints's companyId.
 * @apiParam datapointId Derived datapoints's datapointId.
 * @apiParam response Derived datapoints's response.
 * @apiParam performanceResult Derived datapoints's performanceResult.
 * @apiParam activeStatus Derived datapoints's activeStatus.
 * @apiParam dpStatus Derived datapoints's dpStatus.
 * @apiParam year Derived datapoints's year.
 * @apiParam lastModifiedDate Derived datapoints's lastModifiedDate.
 * @apiParam status Derived datapoints's status.
 * @apiSuccess {Object} derivedDatapoints Derived datapoints's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Derived datapoints not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ companyId, datapointId, response, performanceResult, activeStatus, dpStatus, year, lastModifiedDate, status }),
  create)

/**
 * @api {get} /derived_datapoints Retrieve derived datapoints
 * @apiName RetrieveDerivedDatapoints
 * @apiGroup DerivedDatapoints
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of derived datapoints.
 * @apiSuccess {Object[]} rows List of derived datapoints.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /derived_datapoints/:id Retrieve derived datapoints
 * @apiName RetrieveDerivedDatapoints
 * @apiGroup DerivedDatapoints
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} derivedDatapoints Derived datapoints's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Derived datapoints not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /derived_datapoints/:id Update derived datapoints
 * @apiName UpdateDerivedDatapoints
 * @apiGroup DerivedDatapoints
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam companyId Derived datapoints's companyId.
 * @apiParam datapointId Derived datapoints's datapointId.
 * @apiParam response Derived datapoints's response.
 * @apiParam performanceResult Derived datapoints's performanceResult.
 * @apiParam activeStatus Derived datapoints's activeStatus.
 * @apiParam dpStatus Derived datapoints's dpStatus.
 * @apiParam year Derived datapoints's year.
 * @apiParam lastModifiedDate Derived datapoints's lastModifiedDate.
 * @apiParam status Derived datapoints's status.
 * @apiSuccess {Object} derivedDatapoints Derived datapoints's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Derived datapoints not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ companyId, datapointId, response, performanceResult, activeStatus, dpStatus, year, lastModifiedDate, status }),
  update)

/**
 * @api {delete} /derived_datapoints/:id Delete derived datapoints
 * @apiName DeleteDerivedDatapoints
 * @apiGroup DerivedDatapoints
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Derived datapoints not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
