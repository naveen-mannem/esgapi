import { success, notFound } from '../../services/response/'
import { BoardMatrixDatapoints } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  BoardMatrixDatapoints.create(body)
    .then((boardMatrixDatapoints) => boardMatrixDatapoints.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  BoardMatrixDatapoints.count(query)
    .then(count => BoardMatrixDatapoints.find(query, select, cursor)
      .then((boardMatrixDatapoints) => ({
        count,
        rows: boardMatrixDatapoints.map((boardMatrixDatapoints) => boardMatrixDatapoints.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  BoardMatrixDatapoints.findById(params.id)
    .then(notFound(res))
    .then((boardMatrixDatapoints) => boardMatrixDatapoints ? boardMatrixDatapoints.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  BoardMatrixDatapoints.findById(params.id)
    .then(notFound(res))
    .then((boardMatrixDatapoints) => boardMatrixDatapoints ? Object.assign(boardMatrixDatapoints, body).save() : null)
    .then((boardMatrixDatapoints) => boardMatrixDatapoints ? boardMatrixDatapoints.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  BoardMatrixDatapoints.findById(params.id)
    .then(notFound(res))
    .then((boardMatrixDatapoints) => boardMatrixDatapoints ? boardMatrixDatapoints.remove() : null)
    .then(success(res, 204))
    .catch(next)
