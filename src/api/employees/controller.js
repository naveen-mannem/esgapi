import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Employees } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Employees.create({ ...body, createdBy: user })
    .then((employees) => employees.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Employees.count(query)
    .then(count => Employees.find(query, select, cursor)
      .populate('createdBy')
      .populate('userId')
      .then((employees) => ({
        count,
        rows: employees.map((employees) => employees.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Employees.findById(params.id)
    .populate('createdBy')
    .populate('userId')
    .then(notFound(res))
    .then((employees) => employees ? employees.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Employees.findById(params.id)
    .populate('createdBy')
    .populate('userId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((employees) => employees ? Object.assign(employees, body).save() : null)
    .then((employees) => employees ? employees.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Employees.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((employees) => employees ? employees.remove() : null)
    .then(success(res, 204))
    .catch(next)
