import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { PolarityRules } from '../polarity_rules'
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

export const percentileCalculation = async ({ user, params }, res, next) => {
  let nic = params.nic ? params.nic : '';
  let nicCompaniesList = await Companies.find({ "nic": nic, status: true }).populate('createdBy');
  let nicCompaniesIds = [];
  for (let companyIndex = 0; companyIndex < nicCompaniesList.length; companyIndex++) {
    nicCompaniesIds.push(nicCompaniesList[companyIndex].id);
  }
  console.log(nicCompaniesIds);
  let distinctYears = await StandaloneDatapoints.distinct('year', { companyId: { $in: nicCompaniesIds }, status: true });
  if (distinctYears.length > 0) {
    for (let yearIndex = 0; yearIndex < distinctYears.length; yearIndex++) {
      const year = distinctYears[yearIndex];
      let percentileDatapointsList = await Datapoints.find({ "percentile": "Yes" }).populate('updatedBy').populate('keyIssueId').populate('functionId');
      console.log('percentileDatapointsList', percentileDatapointsList);
      console.log('percentileDatapointsList.length', percentileDatapointsList.length);
      if (percentileDatapointsList.length > 0) {
        for (let pdpIndex = 0; pdpIndex < percentileDatapointsList.length; pdpIndex++) {
          if (percentileDatapointsList[pdpIndex].dataCollection.toLowerCase() == "yes" || percentileDatapointsList[pdpIndex].dataCollection.toLowerCase() == "y") {
            //Find the datapoint response value in StandaloneDatapoints collection
            let dpResponseOfNicCompanies = await StandaloneDatapoints.find({ companyId: { $in: nicCompaniesIds }, datapointId: percentileDatapointsList[pdpIndex].id, year: year, status: true }, { response: 1, _id: 0 });
            console.log('dpResponseOfNicCompanies', dpResponseOfNicCompanies);
            let filteredDpResponses = [];
            _.filter(dpResponseOfNicCompanies, (currentObject, index) => {
              if (currentObject.response !== '' && currentObject.response !== ' ' && currentObject.response.toLowerCase() != "na") {
                filteredDpResponses.push(currentObject.response ? currentObject.response.toString() : currentObject.response);
              }
            });
            let stdDeviation, averageValue;
            if (filteredDpResponses.length > 1) {
              //calculate average and SD
              filteredDpResponses = filteredDpResponses.filter(e => e != "NA");
              filteredDpResponses = filteredDpResponses.filter(e => e.trim());
              filteredDpResponses = filteredDpResponses.map(e => Number(e));
              if (filteredDpResponses.length > 1) {
                averageValue = filteredDpResponses.reduce((prev, next) => prev + next) / filteredDpResponses.length;
                stdDeviation = Math.sqrt(filteredDpResponses.map(x => Math.pow(x - averageValue, 2)).reduce((a, b) => a + b) / (filteredDpResponses.length - 1));
              } else {
                stdDeviation = 'NA';
              }
            } else {
              stdDeviation = 'NA';
            }
            console.log('stdDeviation', stdDeviation);
            for (let cmpIndex = 0; cmpIndex < nicCompaniesList.length; cmpIndex++) {
              const element = nicCompaniesList[cmpIndex];
              let foundResponse = await StandaloneDatapoints.findOne({ companyId: nicCompaniesList[cmpIndex].id, datapointId: percentileDatapointsList[pdpIndex].id, year: year, status: true });
              if (foundResponse) {
                if (foundResponse.response == '' || foundResponse.response == ' ' || foundResponse.response.toLowerCase() == 'na') {
                  await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { response: 'NA', performanceResult: 'NA' } });
                } else {
                  let polarityDetail = await Datapoints.findOne({ _id: percentileDatapointsList[pdpIndex].id });
                  let zscoreValue;
                  if (stdDeviation == 'NA') {
                    await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'NA' } });
                  } else {
                    if (polarityDetail.polarity == 'Positive') {
                      zscoreValue = (Number(foundResponse.response) - Number(averageValue)) / Number(stdDeviation);
                    } else if (polarityDetail.polarity == 'Negative') {
                      zscoreValue = (Number(averageValue) - Number(foundResponse.response)) / Number(stdDeviation);
                    }
                    // Using zscore value we need to find out percentile value
                    if (zscoreValue > 4) {
                      await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: '0' } });
                    } else if (zscoreValue < -4) {
                      await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: '100' } });
                    } else if (zscoreValue == 'NA') {
                      await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'NA' } });
                    } else {
                      //round of zscore value to two digit decimal value
                      if (zscoreValue) {
                        let twoDigitZscoreValue = zscoreValue.toFixed(2) + 0.01;
                        var lastDigit = twoDigitZscoreValue.toString().slice(-1);
                        let ztableValue = await Ztables.findOne({ zScore: zscoreValue.toFixed(1) });
                        let zValues = ztableValue.values[0].split(",");
                        let zScore = zValues[Number(lastDigit)]
                        let percentile = zScore * 100;
                        await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: percentile } });
                      } else {
                        await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'NA' } });
                      }
                    }
                  }
                }
              }
            }
          } else {
            //Find the datapoint response value in DerivedDatapoints collection
            let dpResponseOfNicCompanies = await DerivedDatapoints.find({ companyId: { $in: nicCompaniesIds }, datapointId: percentileDatapointsList[pdpIndex].id, year: year, status: true }, { response: 1, _id: 0 });
            let filteredDpResponses = [];
            for (let resIndex = 0; resIndex < dpResponseOfNicCompanies.length; resIndex++) {
              const currentObject = dpResponseOfNicCompanies[resIndex];
              if (currentObject.response != "NA" && currentObject.response != "" && currentObject.response != " ") {
                filteredDpResponses.push(currentObject.response ? currentObject.response.toString() : currentObject.response);
              }
            }
            let stdDeviation;
            let averageValue;
            if (filteredDpResponses.length > 1) {
              //calculate average and SD
              filteredDpResponses = filteredDpResponses.filter(e => e != "NA");
              filteredDpResponses = filteredDpResponses.filter(e => e.trim());
              filteredDpResponses = filteredDpResponses.map(e => Number(e));
              if (filteredDpResponses.length > 1) {
                averageValue = filteredDpResponses.reduce((prev, next) => prev + next) / filteredDpResponses.length;
                stdDeviation = Math.sqrt(filteredDpResponses.map(x => Math.pow(x - averageValue, 2)).reduce((a, b) => a + b) / (filteredDpResponses.length - 1));
              } else {
                stdDeviation = 'NA';
              }
            } else {
              stdDeviation = 'NA';
            }
            for (let compIndex = 0; compIndex < nicCompaniesList.length; compIndex++) {
              const element = nicCompaniesList[compIndex];
              let foundResponse = await DerivedDatapoints.findOne({ companyId: nicCompaniesList[compIndex].id, datapointId: percentileDatapointsList[pdpIndex].id, year: year, status: true });
              if (foundResponse) {
                if (foundResponse.response == '' || foundResponse.response == ' ' || foundResponse.response.toLowerCase() == 'na') {
                  await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { response: 'NA', performanceResult: 'NA' } });
                } else {
                  let polarityDetail = await Datapoints.findOne({ _id: percentileDatapointsList[pdpIndex].id });
                  let zscoreValue;
                  if (polarityDetail.polarity == 'Positive') {
                    zscoreValue = (Number(foundResponse.response) - Number(averageValue)) / Number(stdDeviation);
                  } else if (polarityDetail.polarity == 'Negative') {
                    zscoreValue = (Number(averageValue) - Number(foundResponse.response)) / Number(stdDeviation);
                  }
                  // Using zscore value we need to find out percentile value
                  if (zscoreValue > 4) {
                    await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: '0' } });
                  } else if (zscoreValue < -4) {
                    await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: '100' } });
                  } else if (zscoreValue == 'NA') {
                    await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'NA' } });
                  } else {
                    //round of zscore value to two digit decimal value
                    if (zscoreValue) {
                      let twoDigitZscoreValue = zscoreValue.toFixed(2) + 0.01;
                      var lastDigit = twoDigitZscoreValue.toString().slice(-1);
                      let ztableValue = await Ztables.findOne({ zScore: zscoreValue.toFixed(1) });
                      let zValues = ztableValue.values[0].split(",");
                      let zScore = zValues[Number(lastDigit)]
                      let percentile = zScore * 100;
                      await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: percentile } });
                    } else {
                      await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'NA' } });
                    }
                  }
                }
              }
            }
          }
        }
      }

    }
  }
  // for (let yearIndex = 0; yearIndex < distinctYears.length; yearIndex++) {
  //   const year = distinctYears[yearIndex];
  //   for (let companyIndex = 0; companyIndex < nicCompaniesList.length; companyIndex++) {
  //     let dataPointsIdList = await Datapoints.find({ standaloneOrMatrix: { "$ne": "Matrix" }, percentile: { "$ne": "Yes" } }).distinct('_id')
  //     let polarityRulesList = await PolarityRules.find({}).distinct('datapointId').exec()
  //     for (let dataPointIndex = 0; dataPointIndex < dataPointsIdList.length; dataPointIndex++) {
  //       if (dataPointsIdList.includes(polarityRulesList[dataPointIndex])) {
  //         let polarityDetail = await Datapoints.findOne({ _id: polarityRulesList[dataPointIndex] })
  //         let polarityRuleDetails = await PolarityRules.findOne({ datapointId: polarityRulesList[dataPointIndex] })
  //         if (polarityDetail.dataCollection.toLowerCase() == "yes" || polarityDetail.dataCollection.toLowerCase() == "y") {

  //           let foundResponse = await StandaloneDatapoints.findOne({ companyId: nicCompaniesList[companyIndex].id, datapointId: polarityRuleDetails.datapointId, year: year, status: true });
  //           if (foundResponse.response == '' || foundResponse.response == ' ' || foundResponse.response.toLowerCase() == 'na') {
  //             await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { response: 'NA', performanceResult: 'NA' } });
  //           } else {
  //             if (Number(foundResponse.response) >= Number(polarityRuleDetails.polarityValue)) {
  //               if (polarityRuleDetails.condition == 'greater' || polarityRuleDetails.condition == 'atleast' || polarityRuleDetails.condition == 'lesserthan') {
  //                 await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Positive' } });
  //               }
  //               else if (polarityRuleDetails.condition == 'greaterthan' || polarityRuleDetails.condition == 'lesser') {
  //                 await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Negative' } });

  //               }
  //             } else if (Number(foundResponse.response) <= Number(polarityRuleDetails.polarityValue)) {
  //               if (polarityRuleDetails.condition == 'greater' || polarityRuleDetails.condition == 'atleast' || polarityRuleDetails.condition == 'lesserthan') {
  //                 await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Negative' } });
  //               }
  //               else if (polarityRuleDetails.condition == 'greaterthan' || polarityRuleDetails.condition == 'lesser') {
  //                 await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Positive' } });

  //               }
  //             } else {
  //               if (polarityRuleDetails.condition == 'range') {
  //                 let param = polarityRuleDetails.polarityValue.split(',');
  //                 if (Number(foundResponse.response) >= Number(param[0]) && Number(foundResponse.response) <= Number(param[1])) {
  //                   await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Positive' } });
  //                 } else {
  //                   await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Negative' } });
  //                 }

  //               }
  //             }

  //           }
  //         } else {
  //           let foundResponse = await DerivedDatapoints.findOne({ companyId: nicCompaniesList[companyIndex].id, datapointId: polarityRuleDetails.datapointId, year: year });
  //           if (foundResponse.response == '' || foundResponse.response == ' ' || foundResponse.response.toLowerCase() == 'na') {
  //             await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { response: 'NA', performanceResult: 'NA' } });
  //           } else {
  //             if (Number(foundResponse.response) >= Number(polarityRuleDetails.polarityValue)) {
  //               if (polarityRuleDetails.condition == 'greater' || polarityRuleDetails.condition == 'atleast' || polarityRuleDetails.condition == 'lesserthan') {
  //                 await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Positive' } });
  //               }
  //               else if (polarityRuleDetails.condition == 'greaterthan' || polarityRuleDetails.condition == 'lesser') {
  //                 await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Negative' } });

  //               }
  //             } else if (Number(foundResponse.response) <= Number(polarityRuleDetails.polarityValue)) {
  //               if (polarityRuleDetails.condition == 'greater' || polarityRuleDetails.condition == 'atleast' || polarityRuleDetails.condition == 'lesserthan') {
  //                 await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Negative' } });
  //               }
  //               else if (polarityRuleDetails.condition == 'greaterthan' || polarityRuleDetails.condition == 'lesser') {
  //                 await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Positive' } });

  //               }
  //             } else {
  //               if (polarityRuleDetails.condition == 'range') {
  //                 let param = polarityRuleDetails.polarityValue.split(',');
  //                 if (Number(foundResponse.response) >= Number(param[0]) && Number(foundResponse.response) <= Number(param[1])) {
  //                   await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Positive' } });
  //                 } else {
  //                   await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Negative' } });
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       } else {
  //         let polarityDetail = await Datapoints.findOne({ _id: dataPointsIdList[dataPointIndex] })
  //         if (polarityDetail.dataCollection.toLowerCase() == "yes" || polarityDetail.dataCollection.toLowerCase() == "y") {
  //           let foundResponse = await StandaloneDatapoints.findOne({ companyId: nicCompaniesList[companyIndex].id, datapointId: dataPointsIdList[dataPointIndex], year: year, status: true });
  //           if (foundResponse) {
  //             if (foundResponse.response == '' || foundResponse.response == ' ' || foundResponse.response.toLowerCase() == 'na' || foundResponse.response.toLowerCase() == 'nan') {
  //               await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { response: 'NA', performanceResult: 'NA' } });
  //             } else {
  //               if (polarityDetail.code == 'BUSP009' || polarityDetail.code == 'BUSP008') {
  //                 if (foundResponse.response == 'No' || foundResponse.response == 'N') {
  //                   await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Positive' } });
  //                 } else if (foundResponse.response == 'Yes' || foundResponse.response == 'Y') {
  //                   await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Negative' } });
  //                 }
  //               } else if (foundResponse.response == "Yes" || foundResponse.response == "Y" || foundResponse.response == "yes" || foundResponse.response == "y") {
  //                 if (polarityDetail.polarity == 'Positive') {
  //                   await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Yes' } });
  //                 }
  //                 else if (polarityDetail.polarity == 'Negative') {
  //                   await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'No' } });
  //                 }
  //                 else {
  //                   await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'NA' } });
  //                 }
  //               }
  //               else if (foundResponse.response == "No" || foundResponse.response == "N" || foundResponse.response == "no" || foundResponse.response == "n") {
  //                 if (polarityDetail.polarity == 'Positive') {
  //                   await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'No' } });
  //                 }
  //                 else if (polarityDetail.polarity == 'Negative') {
  //                   await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Yes' } });
  //                 }
  //                 else {
  //                   await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'NA' } });
  //                 }
  //               }
  //               else if (polarityDetail.finalUnit === 'Number' || polarityDetail.finalUnit === 'Number (Tonne)' || polarityDetail.finalUnit === 'Number (tCO2e)' || polarityDetail.finalUnit.trim() === 'Currency' || polarityDetail.finalUnit === 'Days' || polarityDetail.finalUnit === 'Hours' || polarityDetail.finalUnit === 'Miles' || polarityDetail.finalUnit === 'Million Hours Worked' || polarityDetail.finalUnit === 'No/Low/Medium/High/Very High' || polarityDetail.finalUnit === 'Number (tCFCe)' || polarityDetail.finalUnit === 'Number (Cubic meter)' || polarityDetail.finalUnit === 'Number (KWh)' || polarityDetail.finalUnit === 'Percentage' && polarityDetail.signal == 'No') {
  //                 await StandaloneDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: foundResponse.response } });
  //               }
  //             }              
  //           }
  //         } else {
  //           let foundResponse = await DerivedDatapoints.findOne({ companyId: nicCompaniesList[companyIndex].id, datapointId: dataPointsIdList[dataPointIndex], year: year });
  //           if (foundResponse) {
  //             if (foundResponse.response == '' || foundResponse.response == ' ' || foundResponse.response.toLowerCase() == 'na' || foundResponse.response.toLowerCase() == 'nan') {
  //               await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { response: 'NA', performanceResult: 'NA' } });
  //             } else {
  //               if (polarityDetail.code == 'BUSP009' || polarityDetail.code == 'BUSP008') {
  //                 if (foundResponse.response == 'No' || foundResponse.response == 'N') {
  //                   await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Positive' } });
  //                 } else if (foundResponse.response == 'Yes' || foundResponse.response == 'Y') {
  //                   await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Negative' } });
  //                 }
  //               } else if (foundResponse.response == "Yes" || foundResponse.response == "Y" || foundResponse.response == "yes" || foundResponse.response == "y") {
  //                 if (polarityDetail.polarity == 'Positive') {
  //                   await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Yes' } });
  //                 }
  //                 else if (polarityDetail.polarity == 'Negative') {
  //                   await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'No' } });
  //                 }
  //                 else {
  //                   await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'NA' } });
  //                 }
  //               }
  //               else if (foundResponse.response == "No" || foundResponse.response == "N" || foundResponse.response == "no" || foundResponse.response == "n") {
  //                 if (polarityDetail.polarity == 'Positive') {
  //                   await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'No' } });
  //                 }
  //                 else if (polarityDetail.polarity == 'Negative') {
  //                   await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'Yes' } });
  //                 }
  //                 else {
  //                   await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: 'NA' } });
  //                 }
  //               }
  //               else if (polarityDetail.finalUnit === 'Number' || polarityDetail.finalUnit === 'Number (Tonne)' || polarityDetail.finalUnit === 'Number (tCO2e)' || polarityDetail.finalUnit.trim() === 'Currency' || polarityDetail.finalUnit === 'Days' || polarityDetail.finalUnit === 'Hours' || polarityDetail.finalUnit === 'Miles' || polarityDetail.finalUnit === 'Million Hours Worked' || polarityDetail.finalUnit === 'No/Low/Medium/High/Very High' || polarityDetail.finalUnit === 'Number (tCFCe)' || polarityDetail.finalUnit === 'Number (Cubic meter)' || polarityDetail.finalUnit === 'Number (KWh)' || polarityDetail.finalUnit === 'Percentage' && polarityDetail.signal == 'No') {
  //                 await DerivedDatapoints.updateOne({ _id: foundResponse.id }, { $set: { performanceResult: foundResponse.response } });
  //               }
  //             }              
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  return res.status(200).json({ message: "Percentile calculated successfully!" });
}



