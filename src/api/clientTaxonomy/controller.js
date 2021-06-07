import { success, notFound, authorOrAdmin } from '../../services/response/'
import { ClientTaxonomy } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  ClientTaxonomy.create({ ...body, createdBy: user })
    .then((clientTaxonomy) => clientTaxonomy.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ClientTaxonomy.count(query)
    .then(count => ClientTaxonomy.find(query, select, cursor)
      .populate('createdBy').populate('fields.fieldName')
      .then((clientTaxonomies) => ({
        count,
        rows: clientTaxonomies.map((clientTaxonomy) => clientTaxonomy.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  ClientTaxonomy.findById(params.id)
    .populate('createdBy').populate('fields.fieldName')
    .then(notFound(res))
    .then((clientTaxonomy) => clientTaxonomy ? clientTaxonomy.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  ClientTaxonomy.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((clientTaxonomy) => clientTaxonomy ? Object.assign(clientTaxonomy, body).save() : null)
    .then((clientTaxonomy) => clientTaxonomy ? clientTaxonomy.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  ClientTaxonomy.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((clientTaxonomy) => clientTaxonomy ? clientTaxonomy.remove() : null)
    .then(success(res, 204))
    .catch(next)
