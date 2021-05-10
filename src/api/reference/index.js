import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Reference, { schema } from './model'

const router = new Router()
const { standaloneId, sourceName, url, pageNumber, publicationDate, textSnippet, screenshotInPNG, screenshotType, filePath, createdBy, activeStatus, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /reference Create reference
 * @apiName CreateReference
 * @apiGroup Reference
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam standaloneId Reference's standaloneId.
 * @apiParam sourceName Reference's sourceName.
 * @apiParam url Reference's url.
 * @apiParam pageNumber Reference's pageNumber.
 * @apiParam publicationDate Reference's publicationDate.
 * @apiParam textSnippet Reference's textSnippet.
 * @apiParam screenshotInPNG Reference's screenshotInPNG.
 * @apiParam screenshotType Reference's screenshotType.
 * @apiParam filePath Reference's filePath.
 * @apiParam createdBy Reference's createdBy.
 * @apiParam activeStatus Reference's activeStatus.
 * @apiParam status Reference's status.
 * @apiParam createdAt Reference's createdAt.
 * @apiParam updatedAt Reference's updatedAt.
 * @apiSuccess {Object} reference Reference's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reference not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ standaloneId, sourceName, url, pageNumber, publicationDate, textSnippet, screenshotInPNG, screenshotType, filePath, createdBy, activeStatus, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /reference Retrieve references
 * @apiName RetrieveReferences
 * @apiGroup Reference
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of references.
 * @apiSuccess {Object[]} rows List of references.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /reference/:id Retrieve reference
 * @apiName RetrieveReference
 * @apiGroup Reference
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} reference Reference's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reference not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /reference/:id Update reference
 * @apiName UpdateReference
 * @apiGroup Reference
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam standaloneId Reference's standaloneId.
 * @apiParam sourceName Reference's sourceName.
 * @apiParam url Reference's url.
 * @apiParam pageNumber Reference's pageNumber.
 * @apiParam publicationDate Reference's publicationDate.
 * @apiParam textSnippet Reference's textSnippet.
 * @apiParam screenshotInPNG Reference's screenshotInPNG.
 * @apiParam screenshotType Reference's screenshotType.
 * @apiParam filePath Reference's filePath.
 * @apiParam createdBy Reference's createdBy.
 * @apiParam activeStatus Reference's activeStatus.
 * @apiParam status Reference's status.
 * @apiParam createdAt Reference's createdAt.
 * @apiParam updatedAt Reference's updatedAt.
 * @apiSuccess {Object} reference Reference's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reference not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ standaloneId, sourceName, url, pageNumber, publicationDate, textSnippet, screenshotInPNG, screenshotType, filePath, createdBy, activeStatus, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /reference/:id Delete reference
 * @apiName DeleteReference
 * @apiGroup Reference
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Reference not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
