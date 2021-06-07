import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Kmp } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Kmp.create({ ...body, createdBy: user })
    .then((kmp) => kmp.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Kmp.count(query)
    .then(count => Kmp.find(query, select, cursor)
      .populate('createdBy')
      .populate('companyId')
      .then((kmps) => ({
        count,
        rows: kmps.map((kmp) => kmp.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Kmp.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .then(notFound(res))
    .then((kmp) => kmp ? kmp.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Kmp.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((kmp) => kmp ? Object.assign(kmp, body).save() : null)
    .then((kmp) => kmp ? kmp.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Kmp.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((kmp) => kmp ? kmp.remove() : null)
    .then(success(res, 204))
    .catch(next)
