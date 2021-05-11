import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Validations } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Validations.create({ ...body, createdBy: user })
    .then((validations) => validations.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Validations.count(query)
    .then(count => Validations.find(query, select, cursor)
      .populate('createdBy')
      .populate('datapointId')
      .then((validations) => ({
        count,
        rows: validations.map((validations) => validations.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Validations.findById(params.id)
    .populate('createdBy')
    .populate('datapointId')
    .then(notFound(res))
    .then((validations) => validations ? validations.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Validations.findById(params.id)
    .populate('createdBy')
    .populate('datapointId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((validations) => validations ? Object.assign(validations, body).save() : null)
    .then((validations) => validations ? validations.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Validations.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((validations) => validations ? validations.remove() : null)
    .then(success(res, 204))
    .catch(next)
