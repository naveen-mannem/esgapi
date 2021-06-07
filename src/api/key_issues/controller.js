import { success, notFound } from '../../services/response/'
import { KeyIssues } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  KeyIssues.create(body)
    .then((keyIssues) => keyIssues.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  KeyIssues.count(query)
    .then(count => KeyIssues.find(query, select, cursor)
    .populate('themeId')
      .then((keyIssues) => ({
        count,
        rows: keyIssues.map((keyIssues) => keyIssues.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  KeyIssues.findById(params.id)
  .populate('themeId')
    .then(notFound(res))
    .then((keyIssues) => keyIssues ? keyIssues.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  KeyIssues.findById(params.id)
  .populate('themeId')
    .then(notFound(res))
    .then((keyIssues) => keyIssues ? Object.assign(keyIssues, body).save() : null)
    .then((keyIssues) => keyIssues ? keyIssues.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  KeyIssues.findById(params.id)
    .then(notFound(res))
    .then((keyIssues) => keyIssues ? keyIssues.remove() : null)
    .then(success(res, 204))
    .catch(next)
