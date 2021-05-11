import { success, notFound, authorOrAdmin } from '../../services/response/'
import { TaskAssignment } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  TaskAssignment.create({ ...body, createdBy: user })
    .then((taskAssignment) => taskAssignment.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  TaskAssignment.count(query)
    .then(count => TaskAssignment.find(query, select, cursor)
      .populate('createdBy')
      .populate('companyId')
      .populate('categoryId')
      .populate('groupId')
      .populate('analystId')
      .populate('qaId')
      .then((taskAssignments) => ({
        count,
        rows: taskAssignments.map((taskAssignment) => taskAssignment.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  TaskAssignment.findById(params.id)
      .populate('createdBy')
      .populate('companyId')
      .populate('categoryId')
      .populate('groupId')
      .populate('analystId')
      .populate('qaId')
    .then(notFound(res))
    .then((taskAssignment) => taskAssignment ? taskAssignment.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  TaskAssignment.findById(params.id)
      .populate('createdBy')
      .populate('companyId')
      .populate('categoryId')
      .populate('groupId')
      .populate('analystId')
      .populate('qaId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((taskAssignment) => taskAssignment ? Object.assign(taskAssignment, body).save() : null)
    .then((taskAssignment) => taskAssignment ? taskAssignment.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  TaskAssignment.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((taskAssignment) => taskAssignment ? taskAssignment.remove() : null)
    .then(success(res, 204))
    .catch(next)
