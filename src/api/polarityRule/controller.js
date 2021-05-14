import { success, notFound, authorOrAdmin } from '../../services/response/'
import { PolarityRule } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  PolarityRule.create({ ...body, createdBy: user })
    .then((polarityRule) => polarityRule.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  PolarityRule.count(query)
    .then(count => PolarityRule.find(query, select, cursor)
      .populate('createdBy')
      .populate('Datapoints')
      .then((polarityRules) => ({
        count,
        rows: polarityRules.map((polarityRule) => polarityRule.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  PolarityRule.findById(params.id)
    .populate('createdBy')
    .populate('Datapoints')
    .then(notFound(res))
    .then((polarityRule) => polarityRule ? polarityRule.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  PolarityRule.findById(params.id)
    .populate('createdBy')
    .populate('Datapoints')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((polarityRule) => polarityRule ? Object.assign(polarityRule, body).save() : null)
    .then((polarityRule) => polarityRule ? polarityRule.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  PolarityRule.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((polarityRule) => polarityRule ? polarityRule.remove() : null)
    .then(success(res, 204))
    .catch(next)
