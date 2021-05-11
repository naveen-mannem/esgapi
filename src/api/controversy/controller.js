import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Controversy } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Controversy.create({ ...body, createdBy: user })
    .then((controversy) => controversy.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Controversy.count(query)
    .then(count => Controversy.find(query, select, cursor)
      .populate('createdBy')
      .populate('companyId')
      .populate('dpCodeId')
      .then((controversies) => ({
        count,
        rows: controversies.map((controversy) => controversy.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Controversy.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .populate('dpCodeId')
    .then(notFound(res))
    .then((controversy) => controversy ? controversy.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Controversy.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .populate('dpCodeId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((controversy) => controversy ? Object.assign(controversy, body).save() : null)
    .then((controversy) => controversy ? controversy.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Controversy.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((controversy) => controversy ? controversy.remove() : null)
    .then(success(res, 204))
    .catch(next)
