import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Kmp, { schema } from './model'

const router = new Router()
const { companyId, kmpMemberName, memberStatus, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /KMP Create kmp
 * @apiName CreateKmp
 * @apiGroup Kmp
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam companyId Kmp's companyId.
 * @apiParam kmpMemberName Kmp's kmpMemberName.
 * @apiParam memberStatus Kmp's memberStatus.
 * @apiParam createdAt Kmp's createdAt.
 * @apiParam updatedAt Kmp's updatedAt.
 * @apiSuccess {Object} kmp Kmp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kmp not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ companyId, kmpMemberName, memberStatus, createdAt, updatedAt }),
  create)

/**
 * @api {get} /KMP Retrieve kmps
 * @apiName RetrieveKmps
 * @apiGroup Kmp
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of kmps.
 * @apiSuccess {Object[]} rows List of kmps.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /KMP/:id Retrieve kmp
 * @apiName RetrieveKmp
 * @apiGroup Kmp
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} kmp Kmp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kmp not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /KMP/:id Update kmp
 * @apiName UpdateKmp
 * @apiGroup Kmp
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam companyId Kmp's companyId.
 * @apiParam kmpMemberName Kmp's kmpMemberName.
 * @apiParam memberStatus Kmp's memberStatus.
 * @apiParam createdAt Kmp's createdAt.
 * @apiParam updatedAt Kmp's updatedAt.
 * @apiSuccess {Object} kmp Kmp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kmp not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ companyId, kmpMemberName, memberStatus, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /KMP/:id Delete kmp
 * @apiName DeleteKmp
 * @apiGroup Kmp
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Kmp not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
