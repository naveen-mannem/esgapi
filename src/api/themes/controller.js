import { success, notFound } from '../../services/response/'
import { Themes } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Themes.create(body)
    .then((themes) => themes.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Themes.count(query)
    .then(count => Themes.find(query, select, cursor)
      .populate('categoryId')
      .then((themes) => ({
        count,
        rows: themes.map((themes) => themes.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Themes.findById(params.id)
  .populate('categoryId')
    .then(notFound(res))
    .then((themes) => themes ? themes.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Themes.findById(params.id)
  .populate('categoryId')
    .then(notFound(res))
    .then((themes) => themes ? Object.assign(themes, body).save() : null)
    .then((themes) => themes ? themes.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Themes.findById(params.id)
    .then(notFound(res))
    .then((themes) => themes ? themes.remove() : null)
    .then(success(res, 204))
    .catch(next)
