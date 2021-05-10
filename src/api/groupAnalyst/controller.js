import { success, notFound } from '../../services/response/'
import { GroupAnalyst } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  GroupAnalyst.create(body)
    .then((groupAnalyst) => groupAnalyst.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  GroupAnalyst.count(query)
    .then(count => GroupAnalyst.find(query, select, cursor)
      .then((groupAnalysts) => ({
        count,
        rows: groupAnalysts.map((groupAnalyst) => groupAnalyst.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  GroupAnalyst.findById(params.id)
    .then(notFound(res))
    .then((groupAnalyst) => groupAnalyst ? groupAnalyst.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  GroupAnalyst.findById(params.id)
    .then(notFound(res))
    .then((groupAnalyst) => groupAnalyst ? Object.assign(groupAnalyst, body).save() : null)
    .then((groupAnalyst) => groupAnalyst ? groupAnalyst.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  GroupAnalyst.findById(params.id)
    .then(notFound(res))
    .then((groupAnalyst) => groupAnalyst ? groupAnalyst.remove() : null)
    .then(success(res, 204))
    .catch(next)
