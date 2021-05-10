import { success, notFound } from '../../services/response/'
import { Role } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Role.create(body)
    .then((role) => role.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Role.count(query)
    .then(count => Role.find(query, select, cursor)
      .then((roles) => ({
        count,
        rows: roles.map((role) => role.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Role.findById(params.id)
    .then(notFound(res))
    .then((role) => role ? role.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Role.findById(params.id)
    .then(notFound(res))
    .then((role) => role ? Object.assign(role, body).save() : null)
    .then((role) => role ? role.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Role.findById(params.id)
    .then(notFound(res))
    .then((role) => role ? role.remove() : null)
    .then(success(res, 204))
    .catch(next)
