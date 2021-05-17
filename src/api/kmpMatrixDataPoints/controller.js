import { success, notFound, authorOrAdmin } from '../../services/response/'
import { KmpMatrixDataPoints } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  KmpMatrixDataPoints.create({ ...body, createdBy: user })
    .then((kmpMatrixDataPoints) => kmpMatrixDataPoints.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  KmpMatrixDataPoints.count(query)
    .then(count => KmpMatrixDataPoints.find(query, select, cursor)
      .populate('createdBy')
      .populate('kmpId')
      .populate('datapointId')
      .then((kmpMatrixDataPoints) => ({
        count,
        rows: kmpMatrixDataPoints.map((kmpMatrixDataPoints) => kmpMatrixDataPoints.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  KmpMatrixDataPoints.findById(params.id)
    .populate('createdBy')
    .populate('kmpId')
    .populate('datapointId')
    .then(notFound(res))
    .then((kmpMatrixDataPoints) => kmpMatrixDataPoints ? kmpMatrixDataPoints.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  KmpMatrixDataPoints.findById(params.id)
    .populate('createdBy')
    .populate('kmpId')
    .populate('datapointId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((kmpMatrixDataPoints) => kmpMatrixDataPoints ? Object.assign(kmpMatrixDataPoints, body).save() : null)
    .then((kmpMatrixDataPoints) => kmpMatrixDataPoints ? kmpMatrixDataPoints.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  KmpMatrixDataPoints.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((kmpMatrixDataPoints) => kmpMatrixDataPoints ? kmpMatrixDataPoints.remove() : null)
    .then(success(res, 204))
    .catch(next)
