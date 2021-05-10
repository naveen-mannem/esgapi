import { success, notFound } from '../../services/response/'
import { Groups } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Groups.create(body)
    .then((groups) => groups.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Groups.count(query)
    .then(count => Groups.find(query, select, cursor)
      .then((groups) => ({
        count,
        rows: groups.map((groups) => groups.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Groups.findById(params.id)
    .then(notFound(res))
    .then((groups) => groups ? groups.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Groups.findById(params.id)
    .then(notFound(res))
    .then((groups) => groups ? Object.assign(groups, body).save() : null)
    .then((groups) => groups ? groups.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Groups.findById(params.id)
    .then(notFound(res))
    .then((groups) => groups ? groups.remove() : null)
    .then(success(res, 204))
    .catch(next)
