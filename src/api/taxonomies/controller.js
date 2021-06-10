import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Taxonomies } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Taxonomies.create({ ...body, createdBy: user })
    .then((taxonomies) => taxonomies.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Taxonomies.count(query)
    .then(count => Taxonomies.find(query)
      .populate('createdBy')
      .then((taxonomies) => ({
        count,
        rows: taxonomies.map((taxonomies) => taxonomies.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Taxonomies.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((taxonomies) => taxonomies ? taxonomies.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Taxonomies.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((taxonomies) => taxonomies ? Object.assign(taxonomies, body).save() : null)
    .then((taxonomies) => taxonomies ? taxonomies.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Taxonomies.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((taxonomies) => taxonomies ? taxonomies.remove() : null)
    .then(success(res, 204))
    .catch(next)
