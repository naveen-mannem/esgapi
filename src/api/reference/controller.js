import { success, notFound } from '../../services/response/'
import { Reference } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Reference.create(body)
    .then((reference) => reference.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Reference.count(query)
    .then(count => Reference.find(query, select, cursor)
      .then((references) => ({
        count,
        rows: references.map((reference) => reference.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Reference.findById(params.id)
    .then(notFound(res))
    .then((reference) => reference ? reference.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Reference.findById(params.id)
    .then(notFound(res))
    .then((reference) => reference ? Object.assign(reference, body).save() : null)
    .then((reference) => reference ? reference.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Reference.findById(params.id)
    .then(notFound(res))
    .then((reference) => reference ? reference.remove() : null)
    .then(success(res, 204))
    .catch(next)
