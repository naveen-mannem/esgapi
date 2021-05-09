import { success, notFound } from '../../services/response/'
import { Controversy } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Controversy.create(body)
    .then((controversy) => controversy.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Controversy.count(query)
    .then(count => Controversy.find(query, select, cursor)
      .then((controversies) => ({
        count,
        rows: controversies.map((controversy) => controversy.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Controversy.findById(params.id)
    .then(notFound(res))
    .then((controversy) => controversy ? controversy.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Controversy.findById(params.id)
    .then(notFound(res))
    .then((controversy) => controversy ? Object.assign(controversy, body).save() : null)
    .then((controversy) => controversy ? controversy.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Controversy.findById(params.id)
    .then(notFound(res))
    .then((controversy) => controversy ? controversy.remove() : null)
    .then(success(res, 204))
    .catch(next)
