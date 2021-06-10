import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Companies } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Companies.create({ ...body, createdBy: user })
    .then((companies) => companies.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>{
  Companies.count(query)
    .then(count => Companies.find(query)
      .populate('createdBy')
      .then((companies) => ({
        count,
        rows: companies.map((companies) => companies.view())
      }))
    )
    .then(success(res))
    .catch(next)
}

export const getAllNic = ({ querymen: { query, select, cursor } }, res, next) =>
  Companies.distinct('nic')
    .populate('createdBy')
    .then((companies) => ({
      rows: companies
    })
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Companies.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((companies) => companies ? companies.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Companies.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((companies) => companies ? Object.assign(companies, body).save() : null)
    .then((companies) => companies ? companies.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Companies.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((companies) => companies ? companies.remove() : null)
    .then(success(res, 204))
    .catch(next)

