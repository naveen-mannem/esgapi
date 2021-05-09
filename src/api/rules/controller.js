import { success, notFound } from '../../services/response/'
import { Rules } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Rules.create(body)
    .then((rules) => rules.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Rules.count(query)
    .then(count => Rules.find(query, select, cursor)
      .then((rules) => ({
        count,
        rows: rules.map((rules) => rules.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Rules.findById(params.id)
    .then(notFound(res))
    .then((rules) => rules ? rules.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Rules.findById(params.id)
    .then(notFound(res))
    .then((rules) => rules ? Object.assign(rules, body).save() : null)
    .then((rules) => rules ? rules.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Rules.findById(params.id)
    .then(notFound(res))
    .then((rules) => rules ? rules.remove() : null)
    .then(success(res, 204))
    .catch(next)
