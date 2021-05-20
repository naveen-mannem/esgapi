import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { DerivedDatapoints } from '.'
import { Rules } from '../rules'
import { Datapoints } from '../datapoints'
import { StandaloneDatapoints } from '../standalone_datapoints'
import { BoardMembersMatrixDataPoints } from '../boardMembersMatrixDataPoints'
import { KmpMatrixDataPoints } from '../kmpMatrixDataPoints'

export const create = ({ user, bodymen: { body } }, res, next) =>
  DerivedDatapoints.create({ ...body, createdBy: user })
    .then((derivedDatapoints) => derivedDatapoints.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  DerivedDatapoints.count(query)
    .then(count => DerivedDatapoints.find(query, select, cursor)
      .populate('createdBy')
      .populate('companyId')
      .populate('datapointId')
      .then((derivedDatapoints) => ({
        count,
        rows: derivedDatapoints.map((derivedDatapoints) => derivedDatapoints.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  DerivedDatapoints.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .populate('datapointId')
    .then(notFound(res))
    .then((derivedDatapoints) => derivedDatapoints ? derivedDatapoints.view() : null)
    .then(success(res))
    .catch(next)

export const calculateForACompany = async({ params }, res, next) => {
  console.log('companyId', params.companyId);

  await StandaloneDatapoints.find({ companyId: params.companyId, status: true })
  .populate('createdBy')
  .populate('datapointId')
  .populate('companyId')
  .populate('taskId')
  .then(async(companySADPDetails) => {
    //get distrinc year from companySADPDetails
    let distinctYears = _.uniq(_.map(companySADPDetails, 'year'));
    if(distinctYears.length > 0){
      let allStandaloneDetails = [];
      let allBoardMemberMatrixDetails = [];
      let allKmpMatrixDetails = [];
      let allDatapointsList = await Datapoints.find({ status: true }).populate('updatedBy').populate('keyIssueId').populate('functionId');
      for (let index = 0; index < distinctYears.length; index++) {
        allStandaloneDetails = await StandaloneDatapoints.find({ 
          companyId: params.companyId,
          year: distinctYears[index],
          status: true
        })
        .populate('createdBy')
        .populate('datapointId')
        .populate('companyId')
        .populate('taskId')
        
        allBoardMemberMatrixDetails = await BoardMembersMatrixDataPoints.find({ 
          companyId: params.companyId,
          year: distinctYears[index],
          status: true
        })
        .populate('createdBy')
        .populate('datapointId')
        .populate('companyId')
        
        allKmpMatrixDetails = await KmpMatrixDataPoints.find({ 
          companyId: params.companyId,
          year: distinctYears[index],
          status: true
        })
        .populate('createdBy')
        .populate('datapointId')
        .populate('companyId')
      }
      let mergedDetails = _.concat(allStandaloneDetails, allBoardMemberMatrixDetails, allKmpMatrixDetails);
      let matrixPercentageRules = await Rules.find({ methodName: "MatrixPercentage" }).populate('datapointId');
      for (let i = 0; i < matrixPercentageRules.length; i++) {
        if(matrixPercentageRules[i].methodType != ""){
          let parameters = matrixPercentageRules[i].parameter.split(",");
          console.log('parameters', parameters);
          let numerator = parameters[0] ? parameters[0] : '';
          let denominator = parameters[1] ? parameters[1] : '';
          console.log('matrixPercentageRules[i].datapointId', matrixPercentageRules[i].datapointId);
          console.log('matrixPercentageRules[i].datapointId.id', matrixPercentageRules[i].datapointId.id);
          let numeratorDpObject = _.filter(allDatapointsList, { code: numerator });
          let denominatorDpObject = _.filter(allDatapointsList, { code: denominator });
          let numeratorDpId = numeratorDpObject[0] ? numeratorDpObject[0].id : '';
          let denominatorDpId = denominatorDpObject[0] ? denominatorDpObject[0].id : '';
          let numeratorValues = [];
          let denominatorValues = [];
          _.filter(mergedDetails, (object, index) => {
            for (let i = 0; i < distinctYears.length; i++) {
              const year = distinctYears[i];
              if(object.datapointId.id == numeratorDpId && object.companyId.id == params.companyId && object.year == year){
                numeratorValues.push(object)
              } else if(object.datapointId.id == denominatorDpId && object.companyId.id == params.companyId && object.year == year){
                denominatorValues.push(object)
              }
            }
          });
          console.log('numeratorValues', numeratorValues);
          console.log('denominatorValues', denominatorValues);
        }        
      }
      return res.status(200).json({ message: "Retrieved successfully!", mergedDetails: mergedDetails })
    } else {
      return res.status(500).json({ message: "No year wise data present for this company!" })
    }
  })
}

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  DerivedDatapoints.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .populate('datapointId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((derivedDatapoints) => derivedDatapoints ? Object.assign(derivedDatapoints, body).save() : null)
    .then((derivedDatapoints) => derivedDatapoints ? derivedDatapoints.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  DerivedDatapoints.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((derivedDatapoints) => derivedDatapoints ? derivedDatapoints.remove() : null)
    .then(success(res, 204))
    .catch(next)
