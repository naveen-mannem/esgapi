import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Validations } from '.'
import { Datapoints } from '../datapoints'
import { StandaloneDatapoints } from '../standalone_datapoints'
import _ from 'lodash'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Validations.create({ ...body, createdBy: user })
    .then((validations) => validations.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Validations.count(query)
    .then(count => Validations.find(query, select, cursor)
      .populate('createdBy')
      .populate('datapointId')
      .then((validations) => ({
        count,
        rows: validations.map((validations) => validations.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Validations.findById(params.id)
    .populate('createdBy')
    .populate('datapointId')
    .then(notFound(res))
    .then((validations) => validations ? validations.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Validations.findById(params.id)
    .populate('createdBy')
    .populate('datapointId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((validations) => validations ? Object.assign(validations, body).save() : null)
    .then((validations) => validations ? validations.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Validations.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((validations) => validations ? validations.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const mock_Type8Validation = async ({ user, body }, res, next) => {
  console.log(body.datapointId, body.companyId, body.clientTaxonomyId, body.currentYear, body.previousYear, body.response);
  let standalone_datapoints = await StandaloneDatapoints({ companyId: body.companyId, clientTaxonomyId: body.clientTaxonomyId, year: body.currentYear, status: true });
  let allDatapointsList = await Datapoints.find({ status: true }).populate('updatedBy').populate('keyIssueId').populate('functionId');
  let datapointDetails = await Datapoints.findOne({ _id: body.datapointId });
  if (datapointDetails.methodName.trim() == 'OR') {
    let parameters = datapointDetails.parameter.split(",");
    for (let parameterIndex = 0; parameterIndex < parameters.length; parameterIndex++) {
      let dpId = await Datapoints.findOne({ code: parameters[parameterIndex] });
      let parameterDPResponse = await StandaloneDatapoints.findOne({ companyId: body.companyId, clientTaxonomyId: body.clientTaxonomyId, year: body.currentYear, datapointId: dpId._id })
      let previousYearResponse = await StandaloneDatapoints.findOne({ companyId: body.companyId, clientTaxonomyId: body.clientTaxonomyId, year: body.previousYear, datapointId: body.datapointId })
      if (parameterDPResponse.response) {
        if (parameterDPResponse.response.toLowerCase() == 'yes' || parameterDPResponse.response.toLowerCase() == 'y') {
          if (datapointDetails.checkCondition.trim() == 'greater') {
            let calculatedResponse = (Number(datapointDetails.percentileThresholdValue.replace('%', '')) / 100) * Number(previousYearResponse);
            if (Number(response) > Number(calculatedResponse)) {
              //validation done
            } else {
              // throws error flag response is not valid
            }
          } else {
            let calculatedResponse = (Number(datapointDetails.percentileThresholdValue.replace('%', '')) / 100) * Number(previousYearResponse);
            if (Number(response) < Number(calculatedResponse)) {
              //validation done
            } else {
              // throws errors response is not valid
            }
          }
        } else {
          //
        }
      } else {
        // if there is no response
      }

    }
  } else if (datapointDetails.methodName.trim() == 'YES') {
    let parameter = datapointDetails.parameter.trim();
    let dpId = await Datapoints.findOne({ code: parameter });
    let parameterDPResponse = await StandaloneDatapoints.findOne({ companyId: body.companyId, clientTaxonomyId: body.clientTaxonomyId, year: body.currentYear, datapointId: dpId._id })
    let previousYearResponse = await StandaloneDatapoints.findOne({ companyId: body.companyId, clientTaxonomyId: body.clientTaxonomyId, year: body.previousYear, datapointId: body.datapointId })
    if (parameterDPResponse.response) {
      if (parameterDPResponse.response.toLowerCase() == 'yes' || parameterDPResponse.response.toLowerCase() == 'y') {
        if (datapointDetails.checkCondition.trim() == 'greater') {
          let calculatedResponse = (Number(datapointDetails.percentileThresholdValue.replace('%', '')) / 100) * Number(previousYearResponse);
          if (Number(response) > Number(calculatedResponse)) {
            //validation done
          } else {
            // throws error flag response is not valid
          }
        } else {
          let calculatedResponse = (Number(datapointDetails.percentileThresholdValue.replace('%', '')) / 100) * Number(previousYearResponse);
          if (Number(response) < Number(calculatedResponse)) {
            //validation done
          } else {
            // throws errors response is not valid
          }
        }
      } else {
        // throws error condition fails
      }
    }
  } else if (datapointDetails.methodName.trim() == 'ANDOR') {
    let parameters = datapointDetails.parameter.split(",");
    let param1Object = _.filter(allDatapointsList, { code: parameters[0].trim() });
    let param2Object = _.filter(allDatapointsList, { code: parameters[1].trim() });
    let param3Object = _.filter(allDatapointsList, { code: parameters[2].trim() });
    let param1DpId = param1Object[0] ? param1Object[0].id : '';
    let param2DpId = param2Object[0] ? param2Object[0].id : '';
    let param3DpId = param3Object[0] ? param3Object[0].id : '';
    let param1Value, param2Value, param3Value;
    let previousYearResponse = await StandaloneDatapoints.findOne({ companyId: body.companyId, clientTaxonomyId: body.clientTaxonomyId, year: body.previousYear, datapointId: body.datapointId })

    _.filter(standalone_datapoints, (object, index) => {
      if (object.datapointId == param1DpId, year == body.currentYear) {
        param1Value = object.response ? object.response : ''
      } else if (object.datapointId == param2DpId, year == body.currentYear) {
        param2Value = object.response ? object.response : ''
      } else if (object.datapointId == param3DpId, year == body.currentYear) {
        param3Value = object.response ? object.response : ''
      }
    })
    if ((param1Value.toLowerCase() == 'yes' && param2Value.toLowerCase() == 'yes') || param3Value.toLowerCase() == 'yes') {
      if (datapointDetails.checkCondition.trim() == 'greater') {
        let calculatedResponse = (Number(datapointDetails.percentileThresholdValue.replace('%', '')) / 100) * Number(previousYearResponse);
        if (Number(response) > Number(calculatedResponse)) {
          //validation done
        } else {
          // throws error flag response is not valid
        }
      } else {
        let calculatedResponse = (Number(datapointDetails.percentileThresholdValue.replace('%', '')) / 100) * Number(previousYearResponse);
        if (Number(response) < Number(calculatedResponse)) {
          //validation done
        } else {
          // throws errors response is not valid
        }
      }
    } else {

    }


  } else if (datapointDetails.methodName.trim() == 'ANDOR3') {
    let parameters = datapointDetails.parameter.split(",");
    let param1Object = _.filter(allDatapointsList, { code: parameters[0].trim() });
    let param2Object = _.filter(allDatapointsList, { code: parameters[1].trim() });
    let param3Object = _.filter(allDatapointsList, { code: parameters[2].trim() });
    let param4Object = _.filter(allDatapointsList, { code: parameters[3].trim() });
    let param1DpId = param1Object[0] ? param1Object[0].id : '';
    let param2DpId = param2Object[0] ? param2Object[0].id : '';
    let param3DpId = param3Object[0] ? param3Object[0].id : '';
    let param4DpId = param4Object[0] ? param4Object[0].id : '';

    let param1Value, param2Value, param3Value, param4Value;
    let previousYearResponse = await StandaloneDatapoints.findOne({ companyId: body.companyId, clientTaxonomyId: body.clientTaxonomyId, year: body.previousYear, datapointId: body.datapointId })

    _.filter(standalone_datapoints, (object, index) => {
      if (object.datapointId == param1DpId, year == body.currentYear) {
        param1Value = object.response ? object.response : ''
      } else if (object.datapointId == param2DpId, year == body.currentYear) {
        param2Value = object.response ? object.response : ''
      } else if (object.datapointId == param3DpId, year == body.currentYear) {
        param3Value = object.response ? object.response : ''
      } else if (object.datapointId == param4DpId, year == body.currentYear) {
        param4Value = object.response ? object.response : ''
      }
    })
    if ((param1Value.toLowerCase() == 'yes' && param2Value.toLowerCase() == 'yes' && param3Value.toLowerCase() == 'yes') || param4Value.toLowerCase() == 'yes') {
      if (datapointDetails.checkCondition.trim() == 'greater') {
        let calculatedResponse = (Number(datapointDetails.percentileThresholdValue.replace('%', '')) / 100) * Number(previousYearResponse);
        if (Number(response) > Number(calculatedResponse)) {
          //validation done
        } else {
          // throws error flag response is not valid
        }
      }
    } else {

    }


  }


  return res.status(200).json({ message: "Percentile calculated ", PerformanceResult: body.response });

}
