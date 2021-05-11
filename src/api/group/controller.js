import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Group } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Group.create({ ...body, createdBy: user })
    .then((group) => group.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Group.count(query)
    .then(count => Group.find(query, select, cursor)
      .populate('createdBy')
      .populate('batchId')
      .then((groups) => ({
        count,
        rows: groups.map((group) => group.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Group.findById(params.id)
    .populate('createdBy')
    .populate('batchId')
    .then(notFound(res))
    .then((group) => group ? group.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Group.findById(params.id)
    .populate('createdBy')
    .populate('batchId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((group) => group ? Object.assign(group, body).save() : null)
    .then((group) => group ? group.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Group.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((group) => group ? group.remove() : null)
    .then(success(res, 204))
    .catch(next)
