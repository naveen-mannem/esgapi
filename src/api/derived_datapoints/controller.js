import _ from 'lodash'
import moment from 'moment'
import { getJsDateFromExcel } from 'excel-date-to-js'
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
  const companyId = params.companyId ? params.companyId : null;

  await StandaloneDatapoints.find({ companyId: companyId })
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
      let allDerivedDatapoints = [];

      let allDatapointsList = await Datapoints.find({ status: true }).populate('updatedBy').populate('keyIssueId').populate('functionId');
      for (let index = 0; index < distinctYears.length; index++) {
        allStandaloneDetails = await StandaloneDatapoints.find({ 
          companyId: companyId,
          year: distinctYears[index],
          status: true
        })
        .populate('createdBy')
        .populate('datapointId')
        .populate('companyId')
        .populate('taskId')
        
        allBoardMemberMatrixDetails = await BoardMembersMatrixDataPoints.find({ 
          companyId: companyId,
          year: distinctYears[index],
          memberStatus: true,
          status: true
        })
        .populate('createdBy')
        .populate('datapointId')
        .populate('companyId')
        
        allKmpMatrixDetails = await KmpMatrixDataPoints.find({ 
          companyId: companyId,
          year: distinctYears[index],
          memberStatus: true,
          status: true
        })
        .populate('createdBy')
        .populate('datapointId')
        .populate('companyId')
      }
      let mergedDetails = _.concat(allStandaloneDetails, allBoardMemberMatrixDetails, allKmpMatrixDetails);
      // let distinctRuleMethods = await Rules.distinct('methodName').populate('datapointId');
      let distinctRuleMethods = ["MatrixPercentage", "Minus", "Sum", "count of", "Ratio", "Percentage", "YesNo", "RatioADD", "ADD", "As", "AsPercentage", "AsRatio", "Condition", "Multiply" ];
      console.log('distinctRuleMethods', distinctRuleMethods);
      //Process all rules
      for (let ruleIndex = 0; ruleIndex < distinctRuleMethods.length; ruleIndex++) {
        switch (distinctRuleMethods[ruleIndex]) {
          case "ADD":
            await addCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "As":
            await asCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "AsPercentage":
            await asPercentageCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "AsRatio":
            await asRatioCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "Condition":
            await conditionCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "MatrixPercentage":
            await matrixPercentageCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "Minus":
            await minusCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "Multiply":
            await multiplyCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "Percentage":
            await percentageCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "Ratio":
            await ratioCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "RatioADD":
            await ratioAddCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "Sum":
            await sumCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "YesNo":
            await yesNoCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
          case "count of":
            await countOfCalculation(companyId, mergedDetails, distinctYears, allDatapointsList)
            .then((result) => {
              if(result){
                if(result.mergedDetails && result.allDerivedDatapoints){
                  allDerivedDatapoints = _.concat(allDerivedDatapoints, result.allDerivedDatapoints);
                  mergedDetails = _.concat(mergedDetails, result.allDerivedDatapoints);
                }
              }
            })
            break;
        
          default:
            break;
        }        
      }
      return res.status(200).json({ message: "Retrieved successfully!", allDerivedDatapoints: allDerivedDatapoints, mergedDetails: mergedDetails })
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

async function matrixPercentageCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  let matrixPercentageRules = await Rules.find({ methodName: "MatrixPercentage" }).populate('datapointId');
  for (let i = 0; i < matrixPercentageRules.length; i++) {
    if(matrixPercentageRules[i].methodType != "" || matrixPercentageRules[i].methodType == "composite"){
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
          if(object.datapointId.id == numeratorDpId && object.companyId.id == companyId && object.year == year){
            numeratorValues.push(object)
          } else if(object.datapointId.id == denominatorDpId && object.companyId.id == companyId && object.year == year){
            denominatorValues.push(object)
          }
        }
      });
      console.log('numeratorValues', numeratorValues);
      console.log('denominatorValues', denominatorValues);
      if(numeratorValues.length > 0 && denominatorValues.length > 0 && numeratorValues.length == denominatorValues.length){
        for (let j = 0; j < numeratorValues.length; j++) {
          let numeratorResponseValue = parseInt(numeratorValues[j].response ? [ isNaN(numeratorValues[j].response) ? '0' : numeratorValues[j].response.replace(',', '') ] : '0');
          let denominatorResponseValue = parseInt(denominatorValues[j].response ? [ isNaN(denominatorValues[j].response) ? '0' : denominatorValues[j].response.replace(',', '') ] : '0');
          let derivedResponse = (numeratorResponseValue/denominatorResponseValue)*100;
          let derivedDatapointsObject = {
            companyId: numeratorValues[j].companyId.id,
            datapointId: matrixPercentageRules[i].datapointId.id,
            year: numeratorValues[j].year,
            response: derivedResponse,
            memberName: numeratorValues[j].memberName ? numeratorValues[j].memberName.replace('\r\n', ' ') : '' ,
            memberStatus: true,
            status: true
          }
          allDerivedDatapoints.push(derivedDatapointsObject);
          if(j == numeratorValues.length-1){
            mergedDetails = _.concat(mergedDetails, allDerivedDatapoints);
          }
        }
      }
      console.log('allDerivedDatapoints', allDerivedDatapoints);
      console.log('mergedDetails after derived datapoints added', mergedDetails);
    } else{
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
          if(object.datapointId.id == numeratorDpId && object.companyId.id == companyId && object.year == year){
            numeratorValues.push(object)
          } else if(object.datapointId.id == denominatorDpId && object.companyId.id == companyId && object.year == year){
            denominatorValues.push(object)
          }
        }
      });
      console.log('numeratorValues', numeratorValues);
      console.log('denominatorValues', denominatorValues);
      if(numeratorValues.length > 0 && denominatorValues.length > 0){
        for (let j = 0; j < numeratorValues.length; j++) {
          let numeratorResponseValue = parseInt(numeratorValues[j].response ? [ isNaN(numeratorValues[j].response) ? '0' : numeratorValues[j].response.replace(',', '') ] : '0');
          let denominatorResponseValue = parseInt(denominatorValues[0].response ? [ isNaN(denominatorValues[0].response) ? '0' : denominatorValues[0].response.replace(',', '') ] : '0');
          let derivedResponse = (numeratorResponseValue/denominatorResponseValue)*100;
          let derivedDatapointsObject = {
            companyId: numeratorValues[j].companyId.id,
            datapointId: matrixPercentageRules[i].datapointId.id,
            year: numeratorValues[j].year,
            response: derivedResponse,
            memberName: numeratorValues[j].memberName ? numeratorValues[j].memberName.replace('\r\n', ' ') : '',
            memberStatus: true,
            status: true
          }
          allDerivedDatapoints.push(derivedDatapointsObject);
          if(j == numeratorValues.length-1){
            mergedDetails = _.concat(mergedDetails, allDerivedDatapoints);
          }
        }
      }
      console.log('allDerivedDatapoints', allDerivedDatapoints);
      console.log('mergedDetails after derived datapoints added', mergedDetails);
    }
    if(i == matrixPercentageRules.length-1){
      return { allDerivedDatapoints: allDerivedDatapoints };
    }
  }
}

async function addCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  let addRules = await Rules.find({ methodName: "ADD" }).populate('datapointId');
  console.log('add Calculation');
  return { allDerivedDatapoints: [{ "name": "ithuvum summa" }] };
}

async function asCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  let asRules = await Rules.find({ methodName: "As" }).populate('datapointId');
  console.log('as Calculation');
}

async function asPercentageCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  let asPercentageRules = await Rules.find({ methodName: "AsPercentage" }).populate('datapointId');
  console.log('asPercentage Calculation');
}

async function asRatioCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  let asRatioRules = await Rules.find({ methodName: "AsRatio" }).populate('datapointId');
  console.log('asRatio Calculation');
}

async function conditionCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  let asRatioRules = await Rules.find({ methodName: "Condition" }).populate('datapointId');
  console.log('condition Calculation');
}

async function minusCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  console.log('minus Calculation');
  let minusRules = await Rules.find({ methodName: "Minus" }).populate('datapointId');  
  for (let i = 0; i < minusRules.length; i++) {
    let parameters = minusRules[i].parameter.split(",");
    console.log('parameters', parameters);
    let numerator = parameters[0] ? parameters[0] : '';
    let denominator = parameters[1] ? parameters[1] : '';
    let numeratorDpObject = _.filter(allDatapointsList, { code: numerator });
    let denominatorDpObject = _.filter(allDatapointsList, { code: denominator });
    let numeratorDpId = numeratorDpObject[0] ? numeratorDpObject[0].id : '';
    let denominatorDpId = denominatorDpObject[0] ? denominatorDpObject[0].id : '';
    let numeratorValues = [];
    let denominatorValues = [];
    let derivedResponse;
    _.filter(mergedDetails, (object, index) => {
      for (let i = 0; i < distinctYears.length; i++) {
        const year = distinctYears[i];
        if(object.memberStatus == true){
          if(object.datapointId.id == numeratorDpId && object.companyId.id == companyId && object.year == year){
            numeratorValues.push(object);
          } else if(object.datapointId.id == denominatorDpId && object.companyId.id == companyId && object.year == year){
            denominatorValues.push(object);
          }
        }
      }
    })
    console.log('numeratorValues', numeratorValues);
    console.log('denominatorValues', denominatorValues);
    if(numeratorValues.length > 0 && denominatorValues.length > 0 && numeratorValues.length == denominatorValues.length){
      for (let j = 0; j < numeratorValues.length; j++) {
        let derivedResponse;
        if(denominatorValues[j].response == ' ' || denominatorValues[j].response == '' || denominatorValues[j].response == 'NA'){
          derivedResponse = 'NA';
        } else {
          let numeratorConvertedDate = getJsDateFromExcel(numeratorValues[j].fiscalYearEndDate);
          let denominatorConvertedDate = getJsDateFromExcel(denominatorValues[j].response);
          derivedResponse = moment([numeratorConvertedDate.getUTCFullYear(), numeratorConvertedDate.getUTCMonth(), numeratorConvertedDate.getUTCDate()])
          .diff(moment([denominatorConvertedDate.getUTCFullYear(), denominatorConvertedDate.getUTCMonth(), denominatorConvertedDate.getUTCDate()]), 'years', true)
        }
        let derivedDatapointsObject = {
          companyId: numeratorValues[j].companyId.id,
          datapointId: matrixPercentageRules[i].datapointId.id,
          year: numeratorValues[j].year,
          response: derivedResponse,
          memberName: numeratorValues[j].memberName ? numeratorValues[j].memberName.replace('\r\n', ' ') : '' ,
          memberStatus: true,
          status: true
        }
        allDerivedDatapoints.push(derivedDatapointsObject);
        if(j == numeratorValues.length-1){
          mergedDetails = _.concat(mergedDetails, allDerivedDatapoints);
        }
      }
    }
    console.log('allDerivedDatapoints', allDerivedDatapoints);
    console.log('mergedDetails after derived datapoints added', mergedDetails);
  }
}

async function multiplyCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  let asRatioRules = await Rules.find({ methodName: "Multiply" }).populate('datapointId');
  console.log('multiply Calculation');
}

async function percentageCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  console.log('percentage Calculation');
  let allDerivedDatapoints = [];
  let percentageRules = await Rules.find({ methodName: "Percentage" }).populate('datapointId');
  
  for (let i = 0; i < percentageRules.length; i++) {
    if(percentageRules[i].methodType == "sum,sum"){
      let parameters = percentageRules[i].parameter.split(",");
      console.log('parameters', parameters);
      let numerator = parameters[0] ? parameters[0] : '';
      let denominator = parameters[1] ? parameters[1] : '';
      let numeratorDpObject = _.filter(allDatapointsList, { code: numerator });
      let denominatorDpObject = _.filter(allDatapointsList, { code: denominator });
      let numeratorDpId = numeratorDpObject[0] ? numeratorDpObject[0].id : '';
      let denominatorDpId = denominatorDpObject[0] ? denominatorDpObject[0].id : '';
      let numeratorValues = [];
      let denominatorValues = [];
      let numeratorSum = 0;
      let denominatorSum = 0;
      let derivedResponse;
      _.filter(mergedDetails, (object, index) => {
        for (let i = 0; i < distinctYears.length; i++) {
          const year = distinctYears[i];
          if(object.memberStatus == true){
            if(object.datapointId.id == numeratorDpId && object.companyId.id == companyId && object.year == year){
              if(object.response == 'NA' || object.response == '' || object.response == " "){
                numeratorSum += 0;
              } else {
                numeratorSum += isNaN(object.response) ? 0 : parseInt(object.response.replace(',', ''));
              }
            } else if(object.datapointId.id == denominatorDpId && object.companyId.id == companyId && object.year == year){
              if(object.response == 'NA' || object.response == '' || object.response == " "){
                denominatorSum += 0;
              } else {
                denominatorSum += isNaN(object.response) ? 0 : parseInt(object.response.replace(',', ''));
              }
            }
          }
          derivedResponse = isNaN((numeratorSum/denominatorSum)*100) ? 0 : (numeratorSum/denominatorSum)*100;
          let derivedDatapointsObject = {
            companyId: companyId,
            datapointId: object.datapointId.id,
            year: object.year,
            response: derivedResponse,
            memberName: '',
            memberStatus: true,
            status: true
          }
          allDerivedDatapoints.push(derivedDatapointsObject);
        }
      });
    } else{
      let parameters = percentageRules[i].parameter.split(",");
      console.log('parameters', parameters);
      let numerator = parameters[0] ? parameters[0] : '';
      let denominator = parameters[1] ? parameters[1] : '';
      console.log('percentageRules[i].datapointId', percentageRules[i].datapointId);
      console.log('percentageRules[i].datapointId.id', percentageRules[i].datapointId.id);
      let numeratorDpObject = _.filter(allDatapointsList, { code: numerator });
      let denominatorDpObject = _.filter(allDatapointsList, { code: denominator });
      let numeratorDpId = numeratorDpObject[0] ? numeratorDpObject[0].id : '';
      let denominatorDpId = denominatorDpObject[0] ? denominatorDpObject[0].id : '';
      let numeratorValues = [];
      let denominatorValues = [];
      _.filter(mergedDetails, (object, index) => {
        for (let i = 0; i < distinctYears.length; i++) {
          const year = distinctYears[i];
          if(object.datapointId.id == numeratorDpId && object.companyId.id == companyId && object.year == year){
            numeratorValues.push(object)
          } else if(object.datapointId.id == denominatorDpId && object.companyId.id == companyId && object.year == year){
            denominatorValues.push(object)
          }
        }
      });
      console.log('numeratorValues', numeratorValues);
      console.log('denominatorValues', denominatorValues);
      if(numeratorValues.length > 0 && denominatorValues.length > 0 && numeratorValues.length == denominatorValues.length){
        for (let j = 0; j < numeratorValues.length; j++) {
          let derivedResponse;

          if(numeratorValues[j].response == ' ' || numeratorValues[j] == '' || numeratorValues[j] == 'NA'){
            derivedResponse = 'NA';
          } else if(numeratorValues[j] == '0' || numeratorValues[j] == 0){
            derivedResponse = '0';
          } else {
            if(denominatorValues[j].response == ' ' || denominatorValues[j] == '' || denominatorValues[j] == 'NA' || denominatorValues[j] == '0'){
              derivedResponse = 'NA';
            } else {
              derivedResponse = (parseInt(numeratorValues[j].replace(',', ''))/parseInt(denominatorValues[j].replace(',', '')))*100;
            }
          }
          let derivedDatapointsObject = {
            companyId: numeratorValues[j].companyId.id,
            datapointId: percentageRules[i].datapointId.id,
            year: numeratorValues[j].year,
            response: derivedResponse,
            memberName: '',
            memberStatus: true,
            status: true
          }
          allDerivedDatapoints.push(derivedDatapointsObject);
          if(j == numeratorValues.length-1){
            mergedDetails = _.concat(mergedDetails, allDerivedDatapoints);
          }
        }
      }
      console.log('allDerivedDatapoints', allDerivedDatapoints);
      console.log('mergedDetails after derived datapoints added', mergedDetails);
    }
    if(i == percentageRules.length-1){
      return { allDerivedDatapoints: allDerivedDatapoints };
    }
  }
}

async function ratioAddCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  let asRatioRules = await Rules.find({ methodName: "RatioADD" }).populate('datapointId');
  console.log('ratio add Calculation');
}

async function sumCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  let asRatioRules = await Rules.find({ methodName: "Sum" }).populate('datapointId');
  console.log('sum Calculation');
}

async function yesNoCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  let asRatioRules = await Rules.find({ methodName: "YesNo" }).populate('datapointId');
  console.log('yes no Calculation');
}

async function countOfCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  let asRatioRules = await Rules.find({ methodName: "count of" }).populate('datapointId');
  console.log('count of Calculation');
}

async function ratioCalculation(companyId, mergedDetails, distinctYears, allDatapointsList){
  let allDerivedDatapoints = [];
  //find MACR002, MACR007 and MACR010 from allDatapointsList using _.filter of lodash
  //and loop that array first
  let threeDatapoints = ["ObjectId1", "ObjectId2", "Object3"];
  for (let index = 0; index < threeDatapoints.length; index++) {
    const element = threeDatapoints[index];
    // numerator/denominator
    // push the result in allDerivedDatapoints and return the object
  }


  let asRatioRules = await Rules.find({ methodName: "Ratio" }).populate('datapointId');

  for (let j = 0; j < asRatioRules.length; j++) {
    const element = asRatioRules[j];
    if(!threeDatapoints.includes(asRatioRules[j])){
      // push the result in allDerivedDatapoints and return the object
    }
    
  }

  console.log('conditionCalculation');
}