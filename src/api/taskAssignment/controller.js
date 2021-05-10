import { success, notFound } from '../../services/response/'
import { TaskAssignment } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  TaskAssignment.create(body)
    .then((taskAssignment) => taskAssignment.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  TaskAssignment.count(query)
    .then(count => TaskAssignment.find(query, select, cursor)
      .then((taskAssignments) => ({
        count,
        rows: taskAssignments.map((taskAssignment) => taskAssignment.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  TaskAssignment.findById(params.id)
    .then(notFound(res))
    .then((taskAssignment) => taskAssignment ? taskAssignment.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  TaskAssignment.findById(params.id)
    .then(notFound(res))
    .then((taskAssignment) => taskAssignment ? Object.assign(taskAssignment, body).save() : null)
    .then((taskAssignment) => taskAssignment ? taskAssignment.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  TaskAssignment.findById(params.id)
    .then(notFound(res))
    .then((taskAssignment) => taskAssignment ? taskAssignment.remove() : null)
    .then(success(res, 204))
    .catch(next)
