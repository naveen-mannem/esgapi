import { success, notFound, authorOrAdmin } from '../../services/response/'
import { BoardMembersMatrixDataPoints } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  BoardMembersMatrixDataPoints.create({ ...body, createdBy: user })
    .then((boardMembersMatrixDataPoints) => boardMembersMatrixDataPoints.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  BoardMembersMatrixDataPoints.count(query)
    .then(count => BoardMembersMatrixDataPoints.find(query, select, cursor)
      .populate('createdBy')
      .populate('datapointId')
      .populate('companyId')
      .then((boardMembersMatrixDataPoints) => ({
        count,
        rows: boardMembersMatrixDataPoints.map((boardMembersMatrixDataPoints) => boardMembersMatrixDataPoints.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  BoardMembersMatrixDataPoints.findById(params.id)
    .populate('createdBy')
    .populate('datapointId')
    .populate('companyId')
    .then(notFound(res))
    .then((boardMembersMatrixDataPoints) => boardMembersMatrixDataPoints ? boardMembersMatrixDataPoints.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  BoardMembersMatrixDataPoints.findById(params.id)
    .populate('createdBy')
    .populate('datapointId')
    .populate('companyId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((boardMembersMatrixDataPoints) => boardMembersMatrixDataPoints ? Object.assign(boardMembersMatrixDataPoints, body).save() : null)
    .then((boardMembersMatrixDataPoints) => boardMembersMatrixDataPoints ? boardMembersMatrixDataPoints.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  BoardMembersMatrixDataPoints.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((boardMembersMatrixDataPoints) => boardMembersMatrixDataPoints ? boardMembersMatrixDataPoints.remove() : null)
    .then(success(res, 204))
    .catch(next)
