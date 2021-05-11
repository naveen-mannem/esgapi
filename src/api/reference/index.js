import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Reference, { schema } from './model'

const router = new Router()
const { standaloneId, sourceName, url, pageNumber, publicationDate, textSnippet, screenshotInPNG, screenshotType, filePath, activeStatus, status } = schema.tree

/**
 * @api {post} /references Create reference
 * @apiName CreateReference
 * @apiGroup Reference
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam standaloneId Reference's standaloneId.
 * @apiParam sourceName Reference's sourceName.
 * @apiParam url Reference's url.
 * @apiParam pageNumber Reference's pageNumber.
 * @apiParam publicationDate Reference's publicationDate.
 * @apiParam textSnippet Reference's textSnippet.
 * @apiParam screenshotInPNG Reference's screenshotInPNG.
 * @apiParam screenshotType Reference's screenshotType.
 * @apiParam filePath Reference's filePath.
 * @apiParam activeStatus Reference's activeStatus.
 * @apiSuccess {Object} reference Reference's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reference not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ standaloneId, sourceName, url, pageNumber, publicationDate, textSnippet, screenshotInPNG, screenshotType, filePath, activeStatus }),
  create)

/**
 * @api {get} /references Retrieve references
 * @apiName RetrieveReferences
 * @apiGroup Reference
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of references.
 * @apiSuccess {Object[]} rows List of references.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /references/:id Retrieve reference
 * @apiName RetrieveReference
 * @apiGroup Reference
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} reference Reference's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reference not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /references/:id Update reference
 * @apiName UpdateReference
 * @apiGroup Reference
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam standaloneId Reference's standaloneId.
 * @apiParam sourceName Reference's sourceName.
 * @apiParam url Reference's url.
 * @apiParam pageNumber Reference's pageNumber.
 * @apiParam publicationDate Reference's publicationDate.
 * @apiParam textSnippet Reference's textSnippet.
 * @apiParam screenshotInPNG Reference's screenshotInPNG.
 * @apiParam screenshotType Reference's screenshotType.
 * @apiParam filePath Reference's filePath.
 * @apiParam activeStatus Reference's activeStatus.
 * @apiParam status Reference's status.
 * @apiSuccess {Object} reference Reference's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reference not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ standaloneId, sourceName, url, pageNumber, publicationDate, textSnippet, screenshotInPNG, screenshotType, filePath, activeStatus, status }),
  update)

/**
 * @api {delete} /references/:id Delete reference
 * @apiName DeleteReference
 * @apiGroup Reference
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Reference not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
