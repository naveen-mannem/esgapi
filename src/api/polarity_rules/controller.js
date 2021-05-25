import { success, notFound, authorOrAdmin } from '../../services/response/'
import { PolarityRules } from '.'
import { Companies } from '../companies'
import { StandaloneDatapoints } from '../standalone_datapoints'
import { Datapoints } from '../datapoints'
import { DerivedDatapoints } from '../derived_datapoints'
import { Ztables } from '../ztables'

export const create = ({ user, bodymen: { body } }, res, next) =>
  PolarityRules.create({ ...body, createdBy: user })
    .then((polarityRules) => polarityRules.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  PolarityRules.count(query)
    .then(count => PolarityRules.find(query, select, cursor)
      .populate('createdBy')
      .populate('datapointId')
      .then((polarityRules) => ({
        count,
        rows: polarityRules.map((polarityRules) => polarityRules.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  PolarityRules.findById(params.id)
    .populate('createdBy')
    .populate('datapointId')
    .then(notFound(res))
    .then((polarityRules) => polarityRules ? polarityRules.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  PolarityRules.findById(params.id)
    .populate('createdBy')
    .populate('datapointId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((polarityRules) => polarityRules ? Object.assign(polarityRules, body).save() : null)
    .then((polarityRules) => polarityRules ? polarityRules.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  PolarityRules.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((polarityRules) => polarityRules ? polarityRules.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const percentileCalculation = async({ user, params }, res, next) => {
  let nic = params.nic ? params.nic : ''; 
  let nicCompaniesList = await Companies.find({"nic": nic}).populate('createdBy');
  let nicCompaniesIds = [];
  for (let companyIndex = 0; companyIndex < nicCompaniesList.length; companyIndex++) {
    nicCompaniesIds.push(nicCompaniesList[companyIndex].id);    
  }
  console.log(nicCompaniesIds);
  let distinctYears = await StandaloneDatapoints.distinct('year', { companyId: { $in: nicCompaniesIds } });
  if (distinctYears.length > 0) {
    for (let yearIndex = 0; yearIndex < distinctYears.length; yearIndex++) {
      const year = distinctYears[yearIndex];
      let percentileDatapointsList = await Datapoints.find({ "percentile": "Yes" }).populate('updatedBy').populate('keyIssueId').populate('functionId');
      console.log('percentileDatapointsList', percentileDatapointsList);
      console.log('percentileDatapointsList.length', percentileDatapointsList.length);
      if (percentileDatapointsList.length > 0) {
        for (let pdpIndex = 0; pdpIndex < percentileDatapointsList.length; pdpIndex++) {
          if (percentileDatapointsList[pdpIndex].dataCollection == "Yes") {
            //Find the datapoint response value in StandaloneDatapoints collection
            let dpResponseOfNicCompanies = await StandaloneDatapoints.find({ companyId: { $in: nicCompaniesIds }, datapointId: percentileDatapointsList[pdpIndex].id, year: year }, { response: 1, _id: 0 });
            console.log('dpResponseOfNicCompanies', dpResponseOfNicCompanies);
            let filteredDpResponses = _.filter(dpResponseOfNicCompanies, function(currentObject) {
              return currentObject.response !== '' && currentObject.response !== ' ' && currentObject.response == "NA";
            });
            if (filteredDpResponses.length > 1) {
              //calculate average and SD
              filteredDpResponses = filteredDpResponses.filter(e => String(e.response).trim());
              filteredDpResponses = filteredDpResponses.map(e => Number(e.response));
              const averageValue = filteredDpResponses.reduce((prev, next) => prev + next) / filteredDpResponses.length;
              let stdDeviation = Math.sqrt(filteredDpResponses.map(x => Math.pow(x - averageValue, 2)).reduce((a, b) => a + b) / (filteredDpResponses.length - 1))
              console.log('stdDeviation', stdDeviation);
              for (let companyIndex = 0; companyIndex < nicCompaniesList.length; companyIndex++) {
                const element = nicCompaniesList[companyIndex];
                if (percentileDatapointsList[pdpIndex].dataCollection == "Yes") {
                  let foundResponse = await StandaloneDatapoints.findOne({ companyId: nicCompaniesList[companyIndex].id, datapointId: percentileDatapointsList[pdpIndex].id, year: year });
                  if (foundResponse.response == '' || foundResponse.response == ' ' || foundResponse.response == 'NA') {
                    await StandaloneDatapoints.updateOne({_id: foundResponse.id}, { $set: { response: 'NA', performanceResult: 'NA' }});
                  } else {
                    let polarityDetail = await Datapoints.findOne({ _id: percentileDatapointsList[pdpIndex].id });
                    let zscoreValue;
                    if (Number(polarityDetail.polarityValue) > 0) {
                      zscoreValue = (Number(foundResponse.response)-Number(averageValue))/Number(stdDeviation);
                    } else if (Number(polarityDetail.polarityValue) < 0){
                      zscoreValue = (Number(averageValue)-Number(foundResponse.response))/Number(stdDeviation);
                    }
                    // Using zscore value we need to find out percentile value
                    if (zscoreValue > 4) {
                      await StandaloneDatapoints.updateOne({_id: foundResponse.id}, { $set: { performanceResult: '0' }});
                    } else if (zscoreValue < -4) {
                      await StandaloneDatapoints.updateOne({_id: foundResponse.id}, { $set: { performanceResult: '100' }});
                    } else if (zscoreValue == 'NA') {
                      await StandaloneDatapoints.updateOne({_id: foundResponse.id}, { $set: { performanceResult: 'NA' }});
                    } else {
                      //round of zscore value to two digit decimal value
                      let twoDigitZscoreValue = zscoreValue.toFixed(2) + 0.01;
                      var lastDigit = twoDigitZscoreValue.toString().slice(-1);
                      let ztableValue = await Ztables.findOne({ zScore: zscoreValue.toFixed(1) });
                      let zScore = ztableValue.values[Number(lastDigit)]
                      let percentile = zScore * 100;
                      await StandaloneDatapoints.updateOne({_id: foundResponse.id}, { $set: { performanceResult: percentile }});
                    }
                  }
                } else if(percentileDatapointsList[pdpIndex].dataCollection == "No"){
                  
                  let foundResponse = await DerivedDatapoints.findOne({ companyId: nicCompaniesList[companyIndex].id, datapointId: percentileDatapointsList[pdpIndex].id, year: year });
                  if (foundResponse.response == '' || foundResponse.response == ' ' || foundResponse.response == 'NA') {
                    await DerivedDatapoints.updateOne({_id: foundResponse.id}, { $set: { response: 'NA', performanceResult: 'NA' }});
                  } else {
                    let polarityDetail = await Datapoints.findOne({ _id: percentileDatapointsList[pdpIndex].id });
                    let zscoreValue;
                    if (Number(polarityDetail.polarityValue) > 0) {
                      zscoreValue = (Number(foundResponse.response)-Number(averageValue))/Number(stdDeviation);
                    } else if (Number(polarityDetail.polarityValue) < 0){
                      zscoreValue = (Number(averageValue)-Number(foundResponse.response))/Number(stdDeviation);
                    }
                    // Using zscore value we need to find out percentile value
                    if (zscoreValue > 4) {
                      await DerivedDatapoints.updateOne({_id: foundResponse.id}, { $set: { performanceResult: '0' }});
                    } else if (zscoreValue < -4) {
                      await DerivedDatapoints.updateOne({_id: foundResponse.id}, { $set: { performanceResult: '100' }});
                    } else if (zscoreValue == 'NA') {
                      await DerivedDatapoints.updateOne({_id: foundResponse.id}, { $set: { performanceResult: 'NA' }});
                    } else {
                      //round of zscore value to two digit decimal value
                      let twoDigitZscoreValue = zscoreValue.toFixed(2) + 0.01;
                      var lastDigit = twoDigitZscoreValue.toString().slice(-1);
                      let ztableValue = await Ztables.findOne({ zScore: zscoreValue.toFixed(1) });
                      let zScore = ztableValue.values[Number(lastDigit)]
                      let percentile = zScore * 100;
                      await DerivedDatapoints.updateOne({_id: foundResponse.id}, { $set: { performanceResult: percentile }});
                    }
                  }
                }
              }
            } else {
              //return SD value as NA
              //TODO
            }
          } else {
            //Find the datapoint response value in DerivedDatapoints collection
            let dpResponseOfNicCompanies = await DerivedDatapoints.find({ companyId: { $in: nicCompaniesIds }, datapointId: percentileDatapointsList[pdpIndex].id, year: year }, { response: 1, _id: 0 });
            console.log('dpResponseOfNicCompanies', dpResponseOfNicCompanies);
  
          }
        }
      } 
    } 
  }
  return res.status(200).json({ message: "Percentile calculated successfully!" });
}

async function standardDeviation(value) {
  let Arr = value.filter(e => String(e).trim());
  let values = Arr.filter(e => e != 'NA');
  let result = values.map(i => Number(i));
  const n = result.length;
  if (n > 1) {
    const mean = result.reduce((a, x) => a + x) / n
    let stdDev = Math.sqrt(result.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (n - 1));
    return stdDev;
  } else {
    return 'NA';
  }
}

async function average(dp, companyData, y, arr) {
  try {
    let Arr = arr.filter(e => String(e).trim());
    let rr = Arr.filter(e => e != 'NA');
    let a = rr.filter(Boolean)
    let result = a.map(i => Number(i));

    if (result.length > 0) {
      var value = result.reduce((a, x) => a + x)
      let avg = value / result.length
      return avg;
    } else {
      return 0;
    }
  }
  catch (error) {
    return error;

  }
}