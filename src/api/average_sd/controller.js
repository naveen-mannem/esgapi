import { success, notFound } from '../../services/response/'
import { AverageSd } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  AverageSd.create(body)
    .then((averageSd) => averageSd.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  AverageSd.count(query)
    .then(count => AverageSd.find(query, select, cursor)
      .then((averageSds) => ({
        count,
        rows: averageSds.map((averageSd) => averageSd.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  AverageSd.findById(params.id)
    .then(notFound(res))
    .then((averageSd) => averageSd ? averageSd.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  AverageSd.findById(params.id)
    .then(notFound(res))
    .then((averageSd) => averageSd ? Object.assign(averageSd, body).save() : null)
    .then((averageSd) => averageSd ? averageSd.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  AverageSd.findById(params.id)
    .then(notFound(res))
    .then((averageSd) => averageSd ? averageSd.remove() : null)
    .then(success(res, 204))
    .catch(next)
