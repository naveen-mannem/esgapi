import { success, notFound } from '../../services/response/'
import { CompanyRepAssignment } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  CompanyRepAssignment.create(body)
    .then((companyRepAssignment) => companyRepAssignment.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  CompanyRepAssignment.count(query)
    .then(count => CompanyRepAssignment.find(query, select, cursor)
      .then((companyRepAssignments) => ({
        count,
        rows: companyRepAssignments.map((companyRepAssignment) => companyRepAssignment.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  CompanyRepAssignment.findById(params.id)
    .then(notFound(res))
    .then((companyRepAssignment) => companyRepAssignment ? companyRepAssignment.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  CompanyRepAssignment.findById(params.id)
    .then(notFound(res))
    .then((companyRepAssignment) => companyRepAssignment ? Object.assign(companyRepAssignment, body).save() : null)
    .then((companyRepAssignment) => companyRepAssignment ? companyRepAssignment.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  CompanyRepAssignment.findById(params.id)
    .then(notFound(res))
    .then((companyRepAssignment) => companyRepAssignment ? companyRepAssignment.remove() : null)
    .then(success(res, 204))
    .catch(next)
