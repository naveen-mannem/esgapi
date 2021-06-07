import { success, notFound, authorOrAdmin } from '../../services/response/'
import { MasterTaxonomy } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  MasterTaxonomy.create({ ...body, createdBy: user })
    .then((masterTaxonomy) => masterTaxonomy.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  MasterTaxonomy.count(query)
    .then(count => MasterTaxonomy.find(query, select, cursor)
      .populate('createdBy')
      .then((masterTaxonomies) => ({
        count,
        rows: masterTaxonomies.map((masterTaxonomy) => masterTaxonomy.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  MasterTaxonomy.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((masterTaxonomy) => masterTaxonomy ? masterTaxonomy.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  MasterTaxonomy.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((masterTaxonomy) => masterTaxonomy ? Object.assign(masterTaxonomy, body).save() : null)
    .then((masterTaxonomy) => masterTaxonomy ? masterTaxonomy.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  MasterTaxonomy.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((masterTaxonomy) => masterTaxonomy ? masterTaxonomy.remove() : null)
    .then(success(res, 204))
    .catch(next)
