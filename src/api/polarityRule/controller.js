import { success, notFound } from '../../services/response/'
import { PolarityRule } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  PolarityRule.create(body)
    .then((polarityRule) => polarityRule.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  PolarityRule.count(query)
    .then(count => PolarityRule.find(query, select, cursor)
      .then((polarityRules) => ({
        count,
        rows: polarityRules.map((polarityRule) => polarityRule.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  PolarityRule.findById(params.id)
    .then(notFound(res))
    .then((polarityRule) => polarityRule ? polarityRule.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  PolarityRule.findById(params.id)
    .then(notFound(res))
    .then((polarityRule) => polarityRule ? Object.assign(polarityRule, body).save() : null)
    .then((polarityRule) => polarityRule ? polarityRule.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  PolarityRule.findById(params.id)
    .then(notFound(res))
    .then((polarityRule) => polarityRule ? polarityRule.remove() : null)
    .then(success(res, 204))
    .catch(next)
