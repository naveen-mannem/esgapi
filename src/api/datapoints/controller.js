import _ from 'lodash'
import * as fs from 'fs'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Datapoints } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Datapoints.create({ ...body, updatedBy: user })
    .then((datapoints) => datapoints.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Datapoints.count(query)
    .then(count => Datapoints.find(query, select, cursor)
      .populate('updatedBy')
      .populate('categoryId')
      .populate('keyIssueId')
      .populate('functionId')
      .then((datapoints) => ({
        count,
        rows: datapoints.map((datapoints) => datapoints.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Datapoints.findById(params.id)
    .populate('updatedBy')
    .populate('categoryId')
    .populate('keyIssueId')
    .populate('functionId')
    .then(notFound(res))
    .then((datapoints) => datapoints ? datapoints.view() : null)
    .then(success(res))
    .catch(next)

export const includePolarityFromJson = async (req, res, next) => {
  fs.readFile(__dirname + '/datapoints-master-values.json', async (err, data) => {
    if (err) throw err;
    let datapointsList = JSON.parse(data);
    let allDatapoints = await Datapoints.find({});
    for (let index = 0; index < allDatapoints.length; index++) {
      const element = allDatapoints[index];
      console.log(element.code);
      let foundObject = datapointsList.find(obj => obj.code == element.code);
      console.log('foundObject', foundObject);
      await Datapoints.updateOne({ _id: element.id }, { $set: { polarity: foundObject.polarity ? foundObject.polarity : '' } });
      if (index == allDatapoints.length - 1) {
        return res.status(200).json({ message: "Polarity value added!" });
      }
    }
  })
}

export const includeCategoryIdsFromJson = async (req, res, next) => {
  fs.readFile(__dirname + '/dpcodes-categoryIds.json', async (err, data) => {
    if (err) throw err;
    let datapointsList = JSON.parse(data);
    let allDatapoints = await Datapoints.find({});
    for (let index = 0; index < allDatapoints.length; index++) {
      const element = allDatapoints[index];
      console.log(element.code);
      let foundObject = datapointsList.find(obj => obj.code == element.code);
      console.log('foundObject', foundObject);
      await Datapoints.updateOne({ _id: element.id }, { $set: { categoryId: foundObject.categoryId ? foundObject.categoryId : null } });
      if (index == allDatapoints.length - 1) {
        return res.status(200).json({ message: "CategoryId value added!" });
      }
    }
  })
}

export const includeExtraKeysFromJson = async (req, res, next) => {
  var clientTaxonomyId = req.params.clientTaxonomyId;
  fs.readFile(__dirname + '/extra.json', async (err, data) => {
    if (err) throw err;
    let datapointsList = JSON.parse(data);
    console.log('datapointsList', datapointsList.length)
    for (let index = 0; index < datapointsList.length; index++) {
      var obj = {
        "clientTaxonomyId": clientTaxonomyId,
        "validationRule": datapointsList[index].validationRule,
        "dataType": datapointsList[index].dataType,
        "dependentCodes": datapointsList[index].dependentCodes ? JSON.parse(datapointsList[index].dependentCodes) : [],
        "hasDependentCode": datapointsList[index].hasDependentCode,
        "validationTypes": datapointsList[index].validationTypes ? JSON.parse(datapointsList[index].validationTypes) : [],
        "percentileThresholdValue": datapointsList[index].percentileThresholdValue,
        "DPCODE": datapointsList[index].DPCODE,
        "parameters": datapointsList[index].parameters,
        "methodName": datapointsList[index].methodName,
        "checkCondition": datapointsList[index].checkCondition,
        "criteria": datapointsList[index].criteria,
        "collectionOrderNumber": datapointsList[index].collectionOrderNumber,
      }
      console.log('obj', obj, index + 1);
      await Datapoints.updateOne({ _id: datapointsList[index]._id }, { $set: obj });
    }
    res.status(200).json({ message: "extra cloums added" });
  })
}

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Datapoints.findById(params.id)
    .populate('updatedBy')
    .populate('categoryId')
    .populate('keyIssueId')
    .populate('functionId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'updatedBy'))
    .then((datapoints) => datapoints ? Object.assign(datapoints, body).save() : null)
    .then((datapoints) => datapoints ? datapoints.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Datapoints.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'updatedBy'))
    .then((datapoints) => datapoints ? datapoints.remove() : null)
    .then(success(res, 204))
    .catch(next)
