import { success, notFound } from '../../services/response/'
import { Error } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Error.create(body)
    .then((error) => error.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Error.count(query)
    .then(count => Error.find(query, select, cursor)
      .then((errors) => ({
        count,
        rows: errors.map((error) => error.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Error.findById(params.id)
    .then(notFound(res))
    .then((error) => error ? error.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Error.findById(params.id)
    .then(notFound(res))
    .then((error) => error ? Object.assign(error, body).save() : null)
    .then((error) => error ? error.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Error.findById(params.id)
    .then(notFound(res))
    .then((error) => error ? error.remove() : null)
    .then(success(res, 204))
    .catch(next)
