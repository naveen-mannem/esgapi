import { success, notFound } from '../../services/response/'
import { KmpMatrixDataPoints } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  KmpMatrixDataPoints.create(body)
    .then((kmpMatrixDataPoints) => kmpMatrixDataPoints.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  KmpMatrixDataPoints.count(query)
    .then(count => KmpMatrixDataPoints.find(query, select, cursor)
      .then((kmpMatrixDataPoints) => ({
        count,
        rows: kmpMatrixDataPoints.map((kmpMatrixDataPoints) => kmpMatrixDataPoints.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  KmpMatrixDataPoints.findById(params.id)
    .then(notFound(res))
    .then((kmpMatrixDataPoints) => kmpMatrixDataPoints ? kmpMatrixDataPoints.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  KmpMatrixDataPoints.findById(params.id)
    .then(notFound(res))
    .then((kmpMatrixDataPoints) => kmpMatrixDataPoints ? Object.assign(kmpMatrixDataPoints, body).save() : null)
    .then((kmpMatrixDataPoints) => kmpMatrixDataPoints ? kmpMatrixDataPoints.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  KmpMatrixDataPoints.findById(params.id)
    .then(notFound(res))
    .then((kmpMatrixDataPoints) => kmpMatrixDataPoints ? kmpMatrixDataPoints.remove() : null)
    .then(success(res, 204))
    .catch(next)
