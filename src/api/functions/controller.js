import { success, notFound } from '../../services/response/'
import { Functions } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Functions.create(body)
    .then((functions) => functions.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Functions.count(query)
    .then(count => Functions.find(query, select, cursor)
      .then((functions) => ({
        count,
        rows: functions.map((functions) => functions.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Functions.findById(params.id)
    .then(notFound(res))
    .then((functions) => functions ? functions.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Functions.findById(params.id)
    .then(notFound(res))
    .then((functions) => functions ? Object.assign(functions, body).save() : null)
    .then((functions) => functions ? functions.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Functions.findById(params.id)
    .then(notFound(res))
    .then((functions) => functions ? functions.remove() : null)
    .then(success(res, 204))
    .catch(next)
