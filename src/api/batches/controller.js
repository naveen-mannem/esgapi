import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Batches } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Batches.create({ ...body, createdBy: user })
    .then((batches) => batches.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Batches.count(query)
    .then(count => Batches.find(query, select, cursor)
      .populate('createdBy')
      .then((batches) => ({
        count,
        rows: batches.map((batches) => batches.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Batches.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((batches) => batches ? batches.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Batches.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((batches) => batches ? Object.assign(batches, body).save() : null)
    .then((batches) => batches ? batches.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Batches.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((batches) => batches ? batches.remove() : null)
    .then(success(res, 204))
    .catch(next)
