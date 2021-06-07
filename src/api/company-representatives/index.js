import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export CompanyRepresentatives, { schema } from './model'

const router = new Router()
const { userId, name, companiesList, authenticationLetterForCompanyUrl, companyIdForCompany, status } = schema.tree

/**
 * @api {post} /company-representatives Create company representatives
 * @apiName CreateCompanyRepresentatives
 * @apiGroup CompanyRepresentatives
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam userId Company representatives's userId.
 * @apiParam name Company representatives's name.
 * @apiParam companiesList Company representatives's companiesList.
 * @apiParam authenticationLetterForCompanyUrl Company representatives's authenticationLetterForCompanyUrl.
 * @apiParam companyIdForCompany Company representatives's companyIdForCompany.
 * @apiParam status Company representatives's status.
 * @apiSuccess {Object} companyRepresentatives Company representatives's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company representatives not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ userId, name, companiesList, authenticationLetterForCompanyUrl, companyIdForCompany, status }),
  create)

/**
 * @api {get} /company-representatives Retrieve company representatives
 * @apiName RetrieveCompanyRepresentatives
 * @apiGroup CompanyRepresentatives
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of company representatives.
 * @apiSuccess {Object[]} rows List of company representatives.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /company-representatives/:id Retrieve company representatives
 * @apiName RetrieveCompanyRepresentatives
 * @apiGroup CompanyRepresentatives
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} companyRepresentatives Company representatives's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company representatives not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /company-representatives/:id Update company representatives
 * @apiName UpdateCompanyRepresentatives
 * @apiGroup CompanyRepresentatives
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam userId Company representatives's userId.
 * @apiParam name Company representatives's name.
 * @apiParam companiesList Company representatives's companiesList.
 * @apiParam authenticationLetterForCompanyUrl Company representatives's authenticationLetterForCompanyUrl.
 * @apiParam companyIdForCompany Company representatives's companyIdForCompany.
 * @apiParam status Company representatives's status.
 * @apiSuccess {Object} companyRepresentatives Company representatives's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company representatives not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ userId, name, companiesList, authenticationLetterForCompanyUrl, companyIdForCompany, status }),
  update)

/**
 * @api {delete} /company-representatives/:id Delete company representatives
 * @apiName DeleteCompanyRepresentatives
 * @apiGroup CompanyRepresentatives
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Company representatives not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
