import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Reference, { schema } from './model'

const router = new Router()
const { standalonId, sourceName, url, pageNumber, publicationDate, textSnippet, screenshotInPNG, screenshotType, filePath, createdBy, activeStatus, status, createdAt, updatedAt } = schema.tree

/**
 * @api {post} /reference Create reference
 * @apiName CreateReference
 * @apiGroup Reference
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam standalonId Reference's standalonId.
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
  master(),
  body({ standalonId, sourceName, url, pageNumber, publicationDate, textSnippet, screenshotInPNG, screenshotType, filePath, createdBy, activeStatus, status, createdAt, updatedAt }),
  create)

/**
 * @api {get} /reference Retrieve references
 * @apiName RetrieveReferences
 * @apiGroup Reference
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of references.
 * @apiSuccess {Object[]} rows List of references.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /reference/:id Retrieve reference
 * @apiName RetrieveReference
 * @apiGroup Reference
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} reference Reference's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reference not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /reference/:id Update reference
 * @apiName UpdateReference
 * @apiGroup Reference
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam standalonId Reference's standalonId.
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
  master(),
  body({ standalonId, sourceName, url, pageNumber, publicationDate, textSnippet, screenshotInPNG, screenshotType, filePath, createdBy, activeStatus, status, createdAt, updatedAt }),
  update)

/**
 * @api {delete} /reference/:id Delete reference
 * @apiName DeleteReference
 * @apiGroup Reference
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Reference not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
