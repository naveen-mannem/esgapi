import { success, notFound } from '../../services/response/'
import { GroupQa } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  GroupQa.create(body)
    .then((groupQa) => groupQa.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  GroupQa.count(query)
    .then(count => GroupQa.find(query, select, cursor)
      .then((groupQas) => ({
        count,
        rows: groupQas.map((groupQa) => groupQa.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  GroupQa.findById(params.id)
    .then(notFound(res))
    .then((groupQa) => groupQa ? groupQa.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  GroupQa.findById(params.id)
    .then(notFound(res))
    .then((groupQa) => groupQa ? Object.assign(groupQa, body).save() : null)
    .then((groupQa) => groupQa ? groupQa.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  GroupQa.findById(params.id)
    .then(notFound(res))
    .then((groupQa) => groupQa ? groupQa.remove() : null)
    .then(success(res, 204))
    .catch(next)
