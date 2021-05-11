import { success, notFound, authorOrAdmin } from '../../services/response/'
import { BoardMembers } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  BoardMembers.create({ ...body, createdBy: user })
    .then((boardMembers) => boardMembers.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  BoardMembers.count(query)
    .then(count => BoardMembers.find(query, select, cursor)
      .populate('createdBy')
      .populate('companyId')
      .then((boardMembers) => ({
        count,
        rows: boardMembers.map((boardMembers) => boardMembers.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  BoardMembers.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .then(notFound(res))
    .then((boardMembers) => boardMembers ? boardMembers.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  BoardMembers.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((boardMembers) => boardMembers ? Object.assign(boardMembers, body).save() : null)
    .then((boardMembers) => boardMembers ? boardMembers.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  BoardMembers.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((boardMembers) => boardMembers ? boardMembers.remove() : null)
    .then(success(res, 204))
    .catch(next)
