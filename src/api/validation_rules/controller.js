import { success, notFound, authorOrAdmin } from '../../services/response/'
import { ValidationRules } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  ValidationRules.create({ ...body, createdBy: user })
    .then((validationRules) => validationRules.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ValidationRules.count(query)
    .then(count => ValidationRules.find(query, select, cursor)
      .populate('createdBy')
      .populate('datapointId')
      .then((validationRules) => ({
        count,
        rows: validationRules.map((validationRules) => validationRules.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  ValidationRules.findById(params.id)
    .populate('createdBy')
    .populate('datapointId')
    .then(notFound(res))
    .then((validationRules) => validationRules ? validationRules.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  ValidationRules.findById(params.id)
    .populate('createdBy')
    .populate('datapointId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((validationRules) => validationRules ? Object.assign(validationRules, body).save() : null)
    .then((validationRules) => validationRules ? validationRules.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  ValidationRules.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((validationRules) => validationRules ? validationRules.remove() : null)
    .then(success(res, 204))
    .catch(next)
