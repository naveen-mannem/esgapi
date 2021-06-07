import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export CompanyTaxonomies, { schema } from './model'

const router = new Router()
const { companyId, taxonomies, status } = schema.tree

/**
 * @api {post} /company_taxonomies Create company taxonomies
 * @apiName CreateCompanyTaxonomies
 * @apiGroup CompanyTaxonomies
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam companyId Company taxonomies's companyId.
 * @apiParam taxonomies Company taxonomies's taxonomies.
 * @apiSuccess {Object} companyTaxonomies Company taxonomies's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company taxonomies not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ companyId, taxonomies }),
  create)

/**
 * @api {get} /company_taxonomies Retrieve company taxonomies
 * @apiName RetrieveCompanyTaxonomies
 * @apiGroup CompanyTaxonomies
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of company taxonomies.
 * @apiSuccess {Object[]} rows List of company taxonomies.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /company_taxonomies/:id Retrieve company taxonomies
 * @apiName RetrieveCompanyTaxonomies
 * @apiGroup CompanyTaxonomies
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} companyTaxonomies Company taxonomies's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company taxonomies not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /company_taxonomies/:id Update company taxonomies
 * @apiName UpdateCompanyTaxonomies
 * @apiGroup CompanyTaxonomies
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam companyId Company taxonomies's companyId.
 * @apiParam taxonomies Company taxonomies's taxonomies.
 * @apiParam status Company taxonomies's status.
 * @apiSuccess {Object} companyTaxonomies Company taxonomies's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company taxonomies not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ companyId, taxonomies, status }),
  update)

/**
 * @api {delete} /company_taxonomies/:id Delete company taxonomies
 * @apiName DeleteCompanyTaxonomies
 * @apiGroup CompanyTaxonomies
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Company taxonomies not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
