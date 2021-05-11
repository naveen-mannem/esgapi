import { success, notFound, authorOrAdmin } from '../../services/response/'
import { GroupAnalyst } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  GroupAnalyst.create({ ...body, createdBy: user })
    .then((groupAnalyst) => groupAnalyst.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  GroupAnalyst.count(query)
    .then(count => GroupAnalyst.find(query, select, cursor)
      .populate('createdBy')
      .populate('userId')
      .populate('groupId')
      .then((groupAnalysts) => ({
        count,
        rows: groupAnalysts.map((groupAnalyst) => groupAnalyst.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  GroupAnalyst.findById(params.id)
    .populate('createdBy')
    .populate('userId')
    .populate('groupId')
    .then(notFound(res))
    .then((groupAnalyst) => groupAnalyst ? groupAnalyst.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  GroupAnalyst.findById(params.id)
    .populate('createdBy')
    .populate('userId')
    .populate('groupId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((groupAnalyst) => groupAnalyst ? Object.assign(groupAnalyst, body).save() : null)
    .then((groupAnalyst) => groupAnalyst ? groupAnalyst.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  GroupAnalyst.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((groupAnalyst) => groupAnalyst ? groupAnalyst.remove() : null)
    .then(success(res, 204))
    .catch(next)
