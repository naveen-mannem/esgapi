import { success, notFound, authorOrAdmin } from '../../services/response/'
import { CompanyTaxonomies } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  CompanyTaxonomies.create({ ...body, createdBy: user })
    .then((companyTaxonomies) => companyTaxonomies.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  CompanyTaxonomies.count(query)
    .then(count => CompanyTaxonomies.find(query, select, cursor)
      .populate('createdBy')
      .populate('companyId')
      .populate('taxonomies')
      .then((companyTaxonomies) => ({
        count,
        rows: companyTaxonomies.map((companyTaxonomies) => companyTaxonomies.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  CompanyTaxonomies.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .populate('taxonomies')
    .then(notFound(res))
    .then((companyTaxonomies) => companyTaxonomies ? companyTaxonomies.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  CompanyTaxonomies.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .populate('taxonomies')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((companyTaxonomies) => companyTaxonomies ? Object.assign(companyTaxonomies, body).save() : null)
    .then((companyTaxonomies) => companyTaxonomies ? companyTaxonomies.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  CompanyTaxonomies.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((companyTaxonomies) => companyTaxonomies ? companyTaxonomies.remove() : null)
    .then(success(res, 204))
    .catch(next)
