import { success, notFound } from '../../services/response/'
import { Batch } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Batch.create(body)
    .then((batch) => batch.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Batch.count(query)
    .then(count => Batch.find(query, select, cursor)
      .then((batches) => ({
        count,
        rows: batches.map((batch) => batch.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Batch.findById(params.id)
    .then(notFound(res))
    .then((batch) => batch ? batch.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Batch.findById(params.id)
    .then(notFound(res))
    .then((batch) => batch ? Object.assign(batch, body).save() : null)
    .then((batch) => batch ? batch.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Batch.findById(params.id)
    .then(notFound(res))
    .then((batch) => batch ? batch.remove() : null)
    .then(success(res, 204))
    .catch(next)
