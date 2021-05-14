import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Ztables } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Ztables.create({ ...body, createdBy: user })
    .then((ztables) => ztables.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Ztables.count(query)
    .then(count => Ztables.find(query, select, cursor)
      .populate('createdBy')
      .then((ztables) => ({
        count,
        rows: ztables.map((ztables) => ztables.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Ztables.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((ztables) => ztables ? ztables.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Ztables.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((ztables) => ztables ? Object.assign(ztables, body).save() : null)
    .then((ztables) => ztables ? ztables.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Ztables.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((ztables) => ztables ? ztables.remove() : null)
    .then(success(res, 204))
    .catch(next)
