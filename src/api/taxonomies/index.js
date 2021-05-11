import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Taxonomies, { schema } from './model'

const router = new Router()
const { categoryId, themeId, keyIssueId, indicatorId, indicatorName, indicatorDescription, indicatorPolarity, dataCollectionGuide, unit, dataInput, isApplicableSector, notApplicableReason, datapointType, datapointReportingPeriod, fileDataSource, sourceUrl, sourcePublicationDate, sourcePageNumber, sourceTextSnippetOrSnapshot, commentsAndCalculations, signal, controversy, controversySnippetOrSnapshot, snippetOrSnapshotUrl, sourcePublicationDateOfConspiracy, conspiracyPageNumber, normalizedBy, weighted, status } = schema.tree

/**
 * @api {post} /taxonomies Create taxonomies
 * @apiName CreateTaxonomies
 * @apiGroup Taxonomies
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam categoryId Taxonomies's categoryId.
 * @apiParam themeId Taxonomies's themeId.
 * @apiParam keyIssueId Taxonomies's keyIssueId.
 * @apiParam indicatorId Taxonomies's indicatorId.
 * @apiParam indicatorName Taxonomies's indicatorName.
 * @apiParam indicatorDescription Taxonomies's indicatorDescription.
 * @apiParam indicatorPolarity Taxonomies's indicatorPolarity.
 * @apiParam dataCollectionGuide Taxonomies's dataCollectionGuide.
 * @apiParam unit Taxonomies's unit.
 * @apiParam dataInput Taxonomies's dataInput.
 * @apiParam isApplicableSector Taxonomies's isApplicableSector.
 * @apiParam notApplicableReason Taxonomies's notApplicableReason.
 * @apiParam datapointType Taxonomies's datapointType.
 * @apiParam datapointReportingPeriod Taxonomies's datapointReportingPeriod.
 * @apiParam fileDataSource Taxonomies's fileDataSource.
 * @apiParam sourceUrl Taxonomies's sourceUrl.
 * @apiParam sourcePublicationDate Taxonomies's sourcePublicationDate.
 * @apiParam sourcePageNumber Taxonomies's sourcePageNumber.
 * @apiParam sourceTextSnippetOrSnapshot Taxonomies's sourceTextSnippetOrSnapshot.
 * @apiParam commentsAndCalculations Taxonomies's commentsAndCalculations.
 * @apiParam signal Taxonomies's signal.
 * @apiParam controversy Taxonomies's controversy.
 * @apiParam controversySnippetOrSnapshot Taxonomies's controversySnippetOrSnapshot.
 * @apiParam snippetOrSnapshotUrl Taxonomies's snippetOrSnapshotUrl.
 * @apiParam sourcePublicationDateOfConspiracy Taxonomies's sourcePublicationDateOfConspiracy.
 * @apiParam conspiracyPageNumber Taxonomies's conspiracyPageNumber.
 * @apiParam normalizedBy Taxonomies's normalizedBy.
 * @apiParam weighted Taxonomies's weighted.
 * @apiSuccess {Object} taxonomies Taxonomies's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Taxonomies not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ categoryId, themeId, keyIssueId, indicatorId, indicatorName, indicatorDescription, indicatorPolarity, dataCollectionGuide, unit, dataInput, isApplicableSector, notApplicableReason, datapointType, datapointReportingPeriod, fileDataSource, sourceUrl, sourcePublicationDate, sourcePageNumber, sourceTextSnippetOrSnapshot, commentsAndCalculations, signal, controversy, controversySnippetOrSnapshot, snippetOrSnapshotUrl, sourcePublicationDateOfConspiracy, conspiracyPageNumber, normalizedBy, weighted }),
  create)

/**
 * @api {get} /taxonomies Retrieve taxonomies
 * @apiName RetrieveTaxonomies
 * @apiGroup Taxonomies
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of taxonomies.
 * @apiSuccess {Object[]} rows List of taxonomies.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /taxonomies/:id Retrieve taxonomies
 * @apiName RetrieveTaxonomies
 * @apiGroup Taxonomies
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} taxonomies Taxonomies's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Taxonomies not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /taxonomies/:id Update taxonomies
 * @apiName UpdateTaxonomies
 * @apiGroup Taxonomies
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam categoryId Taxonomies's categoryId.
 * @apiParam themeId Taxonomies's themeId.
 * @apiParam keyIssueId Taxonomies's keyIssueId.
 * @apiParam indicatorId Taxonomies's indicatorId.
 * @apiParam indicatorName Taxonomies's indicatorName.
 * @apiParam indicatorDescription Taxonomies's indicatorDescription.
 * @apiParam indicatorPolarity Taxonomies's indicatorPolarity.
 * @apiParam dataCollectionGuide Taxonomies's dataCollectionGuide.
 * @apiParam unit Taxonomies's unit.
 * @apiParam dataInput Taxonomies's dataInput.
 * @apiParam isApplicableSector Taxonomies's isApplicableSector.
 * @apiParam notApplicableReason Taxonomies's notApplicableReason.
 * @apiParam datapointType Taxonomies's datapointType.
 * @apiParam datapointReportingPeriod Taxonomies's datapointReportingPeriod.
 * @apiParam fileDataSource Taxonomies's fileDataSource.
 * @apiParam sourceUrl Taxonomies's sourceUrl.
 * @apiParam sourcePublicationDate Taxonomies's sourcePublicationDate.
 * @apiParam sourcePageNumber Taxonomies's sourcePageNumber.
 * @apiParam sourceTextSnippetOrSnapshot Taxonomies's sourceTextSnippetOrSnapshot.
 * @apiParam commentsAndCalculations Taxonomies's commentsAndCalculations.
 * @apiParam signal Taxonomies's signal.
 * @apiParam controversy Taxonomies's controversy.
 * @apiParam controversySnippetOrSnapshot Taxonomies's controversySnippetOrSnapshot.
 * @apiParam snippetOrSnapshotUrl Taxonomies's snippetOrSnapshotUrl.
 * @apiParam sourcePublicationDateOfConspiracy Taxonomies's sourcePublicationDateOfConspiracy.
 * @apiParam conspiracyPageNumber Taxonomies's conspiracyPageNumber.
 * @apiParam normalizedBy Taxonomies's normalizedBy.
 * @apiParam weighted Taxonomies's weighted.
 * @apiParam status Taxonomies's status.
 * @apiSuccess {Object} taxonomies Taxonomies's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Taxonomies not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ categoryId, themeId, keyIssueId, indicatorId, indicatorName, indicatorDescription, indicatorPolarity, dataCollectionGuide, unit, dataInput, isApplicableSector, notApplicableReason, datapointType, datapointReportingPeriod, fileDataSource, sourceUrl, sourcePublicationDate, sourcePageNumber, sourceTextSnippetOrSnapshot, commentsAndCalculations, signal, controversy, controversySnippetOrSnapshot, snippetOrSnapshotUrl, sourcePublicationDateOfConspiracy, conspiracyPageNumber, normalizedBy, weighted, status }),
  update)

/**
 * @api {delete} /taxonomies/:id Delete taxonomies
 * @apiName DeleteTaxonomies
 * @apiGroup Taxonomies
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Taxonomies not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
