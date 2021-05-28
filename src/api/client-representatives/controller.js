import { success, notFound, authorOrAdmin } from '../../services/response/'
import { ClientRepresentatives } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  ClientRepresentatives.create({ ...body, createdBy: user })
    .then((clientRepresentatives) => clientRepresentatives.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ClientRepresentatives.count(query)
    .then(count => ClientRepresentatives.find(query, select, cursor)
      .populate('createdBy')
      .populate('companyId')
      .populate('userId')
      .then((clientRepresentatives) => ({
        count,
        rows: clientRepresentatives.map((clientRepresentatives) => clientRepresentatives.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  ClientRepresentatives.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .populate('userId')
    .then(notFound(res))
    .then((clientRepresentatives) => clientRepresentatives ? clientRepresentatives.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  ClientRepresentatives.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .populate('userId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((clientRepresentatives) => clientRepresentatives ? Object.assign(clientRepresentatives, body).save() : null)
    .then((clientRepresentatives) => clientRepresentatives ? clientRepresentatives.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  ClientRepresentatives.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((clientRepresentatives) => clientRepresentatives ? clientRepresentatives.remove() : null)
    .then(success(res, 204))
    .catch(next)
