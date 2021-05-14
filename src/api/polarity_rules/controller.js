import { success, notFound, authorOrAdmin } from '../../services/response/'
import { PolarityRules } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  PolarityRules.create({ ...body, createdBy: user })
    .then((polarityRules) => polarityRules.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  PolarityRules.count(query)
    .then(count => PolarityRules.find(query, select, cursor)
      .populate('createdBy')
      .populate('datapointId')
      .then((polarityRules) => ({
        count,
        rows: polarityRules.map((polarityRules) => polarityRules.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  PolarityRules.findById(params.id)
    .populate('createdBy')
    .populate('datapointId')
    .then(notFound(res))
    .then((polarityRules) => polarityRules ? polarityRules.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  PolarityRules.findById(params.id)
    .populate('createdBy')
    .populate('datapointId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((polarityRules) => polarityRules ? Object.assign(polarityRules, body).save() : null)
    .then((polarityRules) => polarityRules ? polarityRules.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  PolarityRules.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((polarityRules) => polarityRules ? polarityRules.remove() : null)
    .then(success(res, 204))
    .catch(next)
