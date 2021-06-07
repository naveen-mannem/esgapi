import { success, notFound, authorOrAdmin } from '../../services/response/'
import { CompanyRepresentatives } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  CompanyRepresentatives.create({ ...body, createdBy: user })
    .then((companyRepresentatives) => companyRepresentatives.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  CompanyRepresentatives.count(query)
    .then(count => CompanyRepresentatives.find(query, select, cursor)
      .populate('createdBy')
      .populate('userId')
      .populate('companiesList')
      .then((companyRepresentatives) => ({
        count,
        rows: companyRepresentatives.map((companyRepresentatives) => companyRepresentatives.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  CompanyRepresentatives.findById(params.id)
    .populate('createdBy')
    .populate('userId')
    .populate('companiesList')
    .then(notFound(res))
    .then((companyRepresentatives) => companyRepresentatives ? companyRepresentatives.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  CompanyRepresentatives.findById(params.id)
    .populate('createdBy')
    .populate('userId')
    .populate('companiesList')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((companyRepresentatives) => companyRepresentatives ? Object.assign(companyRepresentatives, body).save() : null)
    .then((companyRepresentatives) => companyRepresentatives ? companyRepresentatives.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  CompanyRepresentatives.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((companyRepresentatives) => companyRepresentatives ? companyRepresentatives.remove() : null)
    .then(success(res, 204))
    .catch(next)
