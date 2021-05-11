import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Kmp, { schema } from './model'

const router = new Router()
const { companyId, kmpMemberName, memberStatus, status } = schema.tree

/**
 * @api {post} /kmps Create kmp
 * @apiName CreateKmp
 * @apiGroup Kmp
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam companyId Kmp's companyId.
 * @apiParam kmpMemberName Kmp's kmpMemberName.
 * @apiParam memberStatus Kmp's memberStatus.
 * @apiSuccess {Object} kmp Kmp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kmp not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ companyId, kmpMemberName, memberStatus }),
  create)

/**
 * @api {get} /kmps Retrieve kmps
 * @apiName RetrieveKmps
 * @apiGroup Kmp
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of kmps.
 * @apiSuccess {Object[]} rows List of kmps.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /kmps/:id Retrieve kmp
 * @apiName RetrieveKmp
 * @apiGroup Kmp
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} kmp Kmp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kmp not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /kmps/:id Update kmp
 * @apiName UpdateKmp
 * @apiGroup Kmp
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam companyId Kmp's companyId.
 * @apiParam kmpMemberName Kmp's kmpMemberName.
 * @apiParam memberStatus Kmp's memberStatus.
 * @apiParam status Kmp's status.
 * @apiSuccess {Object} kmp Kmp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kmp not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ companyId, kmpMemberName, memberStatus, status }),
  update)

/**
 * @api {delete} /kmps/:id Delete kmp
 * @apiName DeleteKmp
 * @apiGroup Kmp
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Kmp not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
