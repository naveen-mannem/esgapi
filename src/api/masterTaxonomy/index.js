import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export MasterTaxonomy, { schema } from './model'

const router = new Router()
const { fields } = schema.tree

/**
 * @api {post} /masterTaxonomies Create master taxonomy
 * @apiName CreateMasterTaxonomy
 * @apiGroup MasterTaxonomy
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam fields Master taxonomy's fields.
 * @apiSuccess {Object} masterTaxonomy Master taxonomy's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master taxonomy not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ fields }),
  create)

/**
 * @api {get} /masterTaxonomies Retrieve master taxonomies
 * @apiName RetrieveMasterTaxonomies
 * @apiGroup MasterTaxonomy
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of master taxonomies.
 * @apiSuccess {Object[]} rows List of master taxonomies.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /masterTaxonomies/:id Retrieve master taxonomy
 * @apiName RetrieveMasterTaxonomy
 * @apiGroup MasterTaxonomy
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} masterTaxonomy Master taxonomy's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master taxonomy not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /masterTaxonomies/:id Update master taxonomy
 * @apiName UpdateMasterTaxonomy
 * @apiGroup MasterTaxonomy
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam fields Master taxonomy's fields.
 * @apiSuccess {Object} masterTaxonomy Master taxonomy's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master taxonomy not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ fields }),
  update)

/**
 * @api {delete} /masterTaxonomies/:id Delete master taxonomy
 * @apiName DeleteMasterTaxonomy
 * @apiGroup MasterTaxonomy
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Master taxonomy not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
