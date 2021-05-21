import multer from 'multer'
import XLSX from 'xlsx'
import _ from 'lodash'
import { getJsDateFromExcel } from 'excel-date-to-js'
import mongo from 'mongodb'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { StandaloneDatapoints } from '.'
import { Companies } from '../companies'
import { Datapoints } from '../datapoints'
import { BoardMembersMatrixDataPoints } from '../boardMembersMatrixDataPoints'
import { KmpMatrixDataPoints } from '../kmpMatrixDataPoints'

export const create = ({ user, bodymen: { body } }, res, next) =>
  StandaloneDatapoints.create({ ...body, createdBy: user })
    .then((standaloneDatapoints) => standaloneDatapoints.view(true))
    .then(success(res, 201))
    .catch(next)


var companyESG = multer.diskStorage({ //multers disk shop photos storage settings
  destination: function (req, file, cb) {
    // cb(null, './uploads/')
    console.log('__dirname ', __dirname);
    // console.log('process.env.PWD', process.env.PWD);
    cb(null, __dirname + '/uploads');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});
var upload = multer({ //multer settings
  storage: companyESG,
  fileFilter: function (req, file, callback) { //file filter
    if (['xls', 'xlsx', 'xlsm'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
      return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
  }
}).fields([{ name: 'file', maxCount: 60 }]);

export const uploadCompanyESGFiles = async (req, res, next) => {
  const userDetail = req.user;
  upload(req, res, async function (err) {
    console.log(new Error(err));
    if (err) {
      res.status('400').json({ error_code: 1, err_desc: err });
      return;
    }
    let allFilesObject = [];
    for (let index = 0; index < req.files.file.length; index++) {
      let parsedSheetObject = [];
      const filePath = req.files.file[index].path;
      var workbook = XLSX.readFile(filePath, {sheetStubs: false, defval: ''});
      var sheet_name_list = workbook.SheetNames;

      sheet_name_list.forEach(function (currentSheetName) {
        if (currentSheetName != 'Sheet3') {
          //getting the complete sheet
          var worksheet = workbook.Sheets[currentSheetName];
          let headerRowsNumber = [];
          if (currentSheetName == 'Matrix-Directors' || currentSheetName == 'Matrix-KMP') {
            let headersIndexDetails = _.filter(worksheet, (object, index) => {
              if (object.v == "Category") {
                headerRowsNumber.push(parseInt(index.substring(1)));
                return index;
              }
            });
          }
          var headers = {};
          var headers1 = {};
          var data = [];
          if (currentSheetName == 'Matrix-Directors' || currentSheetName == 'Matrix-KMP') {
            for (const cellId in worksheet) {
              if (cellId[0] === "!") continue;
              //parse out the column, row, and value
              // var col = cellId.substring(0, 1);  
              var colStringName = cellId.replace(/[0-9]/g, '');
              var col = colStringName;
              // var row = parseInt(cellId.substring(1));  
              var row = parseInt(cellId.match(/(\d+)/));
              var value = worksheet[cellId].v;
              //store header names
              if (row == 1) {
                if(value != "Error types and definitions"){
                  if(isNaN(value)) { 
                    headers[col] = value.replace('\r\n', ' ');
                  }
                }
                // storing the header names
                continue;
              } else if (headerRowsNumber.includes(row) && row != 1) {
                if(isNaN(value)) { 
                  headers1[col] = value.replace('\r\n', ' ');
                }
                // storing the header names
                continue;
              }
              // if(headerRowsNumber.includes(row) && row != 1){
              if (row > headerRowsNumber[1] && row != 1) {
                if (!data[row]) data[row] = {};
                if(isNaN(value)) { 
                  data[row][headers1[col]] = value.replace('\r\n', ' ');
                }
              } else {
                if (!data[row]) {
                  data[row] = {};
                  data[row][headers[col]] = '';
                }
                if(isNaN(value)) { 
                  data[row][headers[col]] = value.replace('\r\n', ' ');
                }
              }
            }
            //drop those first two rows which are empty
            data.shift();
            data.shift();
            parsedSheetObject.push(data);

          } else {
            for (const cellId in worksheet) {
              if (cellId[0] === "!") continue;
              //parse out the column, row, and value
              var col = cellId.substring(0, 1);
              var row = parseInt(cellId.substring(1));
              var value = worksheet[cellId].v;
              //store header names
              if (row == 1) {
                headers[col] = value;
                // storing the header names
                continue;
              }

              if (!data[row]) data[row] = {};
              data[row][headers[col]] = value;
            }
            //drop those first two rows which are empty
            data.shift();
            data.shift();
            parsedSheetObject.push(data);
          }
        }
      });
      allFilesObject.push(parsedSheetObject)
    }

    //processing the extracted json from excel sheets start

    let allCompanyInfos = [];
    let allStandaloneDetails = [];
    let allBoardMemberMatrixDetails = [];
    let allKmpMatrixDetails = [];
    //loop no of files uploaded
    for (let allFilesArrayIndex = 0; allFilesArrayIndex < allFilesObject.length; allFilesArrayIndex++) {
      //iterate each file
      let noOfSheetsInAnFile = allFilesObject[allFilesArrayIndex].length;

      //loop no of sheets in a file
      let currentCompanyName = '';
      for (let singleFileIndex = 0; singleFileIndex < noOfSheetsInAnFile; singleFileIndex++) {
        //iterate each sheet in a file
        let noOfRowsInASheet = allFilesObject[allFilesArrayIndex][singleFileIndex].length;
        for (let rowIndex = 0; rowIndex < noOfRowsInASheet; rowIndex++) {
          if (singleFileIndex == 0 && rowIndex == 0) {
            allCompanyInfos.push(allFilesObject[allFilesArrayIndex][singleFileIndex][rowIndex]);
            currentCompanyName = allFilesObject[allFilesArrayIndex][singleFileIndex][rowIndex]['CIN'];
          } else if (noOfSheetsInAnFile > 2) {
            if (allFilesObject[allFilesArrayIndex][singleFileIndex][rowIndex]) {
              allFilesObject[allFilesArrayIndex][singleFileIndex][rowIndex].CIN = currentCompanyName;
            }
            if (singleFileIndex == 2) {
              allBoardMemberMatrixDetails.push(allFilesObject[allFilesArrayIndex][singleFileIndex][rowIndex])
            } else if (singleFileIndex == 3) {
              allKmpMatrixDetails.push(allFilesObject[allFilesArrayIndex][singleFileIndex][rowIndex])
            } else if(singleFileIndex == 1){
              allStandaloneDetails.push(allFilesObject[allFilesArrayIndex][singleFileIndex][rowIndex])
            }
          } else {
            allFilesObject[allFilesArrayIndex][singleFileIndex][rowIndex].CIN = currentCompanyName;
            allStandaloneDetails.push(allFilesObject[allFilesArrayIndex][singleFileIndex][rowIndex])
          }
        }
      }
    }
    const companiesToBeAdded = _.uniqBy(allCompanyInfos, 'CIN');
    const structuredCompanyDetails = [];
    for (let index = 0; index < companiesToBeAdded.length; index++) {
      const item = companiesToBeAdded[index];

      let companyObject = {
        companyName: item['Company Name'],
        cin: item['CIN'],
        nicCode: item['NIC Code'],
        nic: item['NIC Code'],
        nicIndustry: item['NIC industry'],
        isinCode: item['ISIN Code'],
        cmieProwessCode: item['CMIE/Prowess Code'],
        socialAnalystName: item['Analyst Name'],
        socialQAName: item['QA Name'],
        status: true,
        createdBy: userDetail
      }
      await Companies.updateOne({ cin: item['CIN'] }, { $set: companyObject }, { upsert: true });
      structuredCompanyDetails.push(companyObject);
    }
    // await Companies.insertMany(structuredCompanyDetails)
    // .then((err, result) => {
    //   if(err){
    //     console.log('error', err);
    //   } else {
    //     console.log('result', result);
    //   }
    // });

    const datapointList = await Datapoints.find({ status: true }).populate('updatedBy').populate('keyIssueId').populate('functionId');
    const companiesList = await Companies.find({ status: true }).populate('createdBy');
    let filteredBoardMemberMatrixDetails = _.filter(allBoardMemberMatrixDetails, (x) => {
      if (x) {
        if (Object.keys(x)[0] != undefined) {
          if (Object.keys(x)[0].toString() != Object.values(x)[0]) {
            return x;
          }
        }
      }
    });

    let filteredKmpMatrixDetails = _.filter(allKmpMatrixDetails, (x) => {
      if (x) {
        if (Object.keys(x)[0] != undefined) {
          if (Object.keys(x)[0].toString() != Object.values(x)[0]) {
            return x;
          }
        }
      }
    });
    const structuredStandaloneDetails = allStandaloneDetails.map(function (item) {
      let companyObject = companiesList.filter(obj => obj.cin === item['CIN']);
      let datapointObject = datapointList.filter(obj => obj.code === item['DP Code']);
      return {
        categoryName: item['Category'],
        keyIssueName: item['Key Issues'],
        datapointId: datapointObject[0] ? datapointObject[0].id : null,
        year: item['Fiscal Year'],
        fiscalYearEndDate: item['Fiscal Year End Date'],
        response: item['Response'],
        companyId: companyObject[0] ? companyObject[0].id : null,
        performanceResult: '',
        standaloneStatus: '',
        taskId: null,
        submittedBy: '',
        submittedDate: '',
        activeStatus: '',
        lastModifiedDate: '',
        modifiedBy: '',
        isSubmitted: false,
        status: true,
        createdBy: userDetail
      }
    });
    var insertedCompanies = _.filter(companiesList, (item) =>
      !_.some(structuredCompanyDetails, (obj) => item.cin === obj.cin));

    let insertedCompanyIds = [];
    _.forEach(insertedCompanies, (company) => {
      insertedCompanyIds.push(company.id);
    });

    let distinctObjectByYears = _.uniqBy(structuredStandaloneDetails, 'year');
    let distinctYears = [];
    _.forEach(distinctObjectByYears, (obj) => {
      distinctYears.push(obj.year);
    });
    const markExistingRecordsAsFalse = await StandaloneDatapoints.updateMany({
      "companyId": { $in: insertedCompanyIds },
      "year": { $in: distinctYears }
    }, { $set: { status: false } }, {});
    await StandaloneDatapoints.insertMany(structuredStandaloneDetails)
      .then((err, result) => {
        if (err) {
          console.log('error', err);
        } else {
          //  console.log('result', result);
        }
      });

    let boardMembersList = [];
    let inactiveBoardMembersList = [];
    let kmpMembersList = [];
    const structuredBoardMemberMatrixDetails = filteredBoardMemberMatrixDetails.map(function (item) {
      let companyObject = companiesList.filter(obj => obj.cin === item['CIN']);
      let datapointObject = datapointList.filter(obj => obj.code === item['DP Code']);
      let allKeyNamesList = Object.keys(item);
      const boardMembersNameList = _.filter(allKeyNamesList, function (keyName) {
        let trimmedKeyName = keyName.replace(/\s/g, "").replace('\r\n', '').toLowerCase();
        return trimmedKeyName != "category" && trimmedKeyName != "keyissues" && trimmedKeyName != "dpcode" 
        && trimmedKeyName != "indicator" && trimmedKeyName != "description" && trimmedKeyName != "datatype" 
        && trimmedKeyName != "unit" && trimmedKeyName != "fiscalyear" && trimmedKeyName != "fiscalyearenddate" 
        && trimmedKeyName != "cin" && trimmedKeyName != "sourcename" && trimmedKeyName != "url" 
        && trimmedKeyName != "pagenumber" && trimmedKeyName != "publicationdate" && trimmedKeyName != "textsnippet" 
        && trimmedKeyName != "screenshot(inpng)" && trimmedKeyName != "worddoc(.docx)" && trimmedKeyName != "excel(.xlsx)" 
        && trimmedKeyName != "excel(.xlxsx)" && trimmedKeyName != "pdf" && trimmedKeyName != "filepathway(ifany)" 
        && trimmedKeyName != "comments/calculations" && trimmedKeyName != "dataverification" 
        && trimmedKeyName != "errortype" && trimmedKeyName != "errorcomments" && trimmedKeyName != "internalfilesource" 
        && trimmedKeyName != "errorstatus" && trimmedKeyName != "analystcomments" && trimmedKeyName != "additionalcomments" 
        && trimmedKeyName != "errortypesanddefinitions" && trimmedKeyName != "count" && trimmedKeyName != "20" 
        && trimmedKeyName != "t2.evidencenotsubstantive" && trimmedKeyName != "0" && trimmedKeyName != "7" 
        && trimmedKeyName != "goodtohave" && trimmedKeyName != "t2.others/noerror" 
        && trimmedKeyName != "whenitisnotananalysterror/itisjustasuggestion" && trimmedKeyName != "undefined";
      });
      _.forEach(boardMembersNameList, function (value) {
        let memberDetail = {
          memberName: value,
          response: item[value],
          datapointId: datapointObject[0] ? datapointObject[0].id : null,
          companyId: companyObject[0] ? companyObject[0].id : null,
          year: item['Fiscal Year'],
          fiscalYearEndDate: item['Fiscal Year End Date'],
          memberStatus: true,
          status: true,
          createdBy: userDetail
        };
        boardMembersList.push(memberDetail);
        if (item['DP Code'] == 'BOIR018') {
          if (item[value] != 'No' && item[value] != '' && item[value] != undefined && item[value] != null) {
            let cessaDate = getJsDateFromExcel(item[value]);
            let currentDate = new Date();
            if (cessaDate < currentDate) {
              inactiveBoardMembersList.push(memberDetail)
            }
          }
        }
      });
      return {
        datapointId: datapointObject[0] ? datapointObject[0].id : null,
        companyId: companyObject[0] ? companyObject[0].id : null,
        year: item['Fiscal Year'],
        response: item['Response'] ? item['Response'] : '',
        fiscalYearEndDate: item['Fiscal Year End Date'],
        status: true,
        createdBy: userDetail
      }
    });

    _.forEach(inactiveBoardMembersList, function (object) {
      let indexToUpdate = _.findIndex(boardMembersList, object);
      boardMembersList[indexToUpdate].memberStatus = false;
    });
    //Marking existing Data as False in BoardMemberMatrixDP 
    await BoardMembersMatrixDataPoints.updateMany({
      "companyId": { $in: insertedCompanyIds },
      "year": { $in: distinctYears }
    }, { $set: { status: false } }, {});
    await BoardMembersMatrixDataPoints.insertMany(boardMembersList)
      .then((err, result) => {
        if (err) {
          console.log('error', err);
        } else {
          // console.log('result', result);
        }
      });

    const structuredKmpMatrixDetails = filteredKmpMatrixDetails.map(function (item) {
      let companyObject = companiesList.filter(obj => obj.cin === item['CIN']);
      let datapointObject = datapointList.filter(obj => obj.code === item['DP Code']);
      let allKeyNamesList = Object.keys(item);
      const kmpMembersNameList = _.filter(allKeyNamesList, function (keyName) {
        let trimmedKeyName = keyName.replace(/\s/g, "").replace('\r\n', '').toLowerCase();
        return trimmedKeyName != "category" && trimmedKeyName != "keyissues" && trimmedKeyName != "dpcode" 
        && trimmedKeyName != "indicator" && trimmedKeyName != "description" && trimmedKeyName != "datatype" 
        && trimmedKeyName != "unit" && trimmedKeyName != "fiscalyear" && trimmedKeyName != "fiscalyearenddate" 
        && trimmedKeyName != "cin" && trimmedKeyName != "sourcename" && trimmedKeyName != "url" 
        && trimmedKeyName != "pagenumber" && trimmedKeyName != "publicationdate" && trimmedKeyName != "textsnippet" 
        && trimmedKeyName != "screenshot(inpng)" && trimmedKeyName != "worddoc(.docx)" && trimmedKeyName != "excel(.xlsx)" 
        && trimmedKeyName != "excel(.xlxsx)" && trimmedKeyName != "pdf" && trimmedKeyName != "filepathway(ifany)" 
        && trimmedKeyName != "comments/calculations" && trimmedKeyName != "dataverification" 
        && trimmedKeyName != "errortype" && trimmedKeyName != "errorcomments" && trimmedKeyName != "internalfilesource" 
        && trimmedKeyName != "errorstatus" && trimmedKeyName != "analystcomments" && trimmedKeyName != "additionalcomments" 
        && trimmedKeyName != "errortypesanddefinitions" && trimmedKeyName != "count" && trimmedKeyName != "20" 
        && trimmedKeyName != "t2.evidencenotsubstantive" && trimmedKeyName != "0" && trimmedKeyName != "7" 
        && trimmedKeyName != "goodtohave" && trimmedKeyName != "t2.others/noerror" 
        && trimmedKeyName != "whenitisnotananalysterror/itisjustasuggestion" && trimmedKeyName != "undefined";
      });
      let currentMemberStatus;
      _.forEach(kmpMembersNameList, function (value) {
        let memberDetail = {
          memberName: value,
          response: item[value],
          memberStatus: true,
          datapointId: datapointObject[0] ? datapointObject[0].id : null,
          companyId: companyObject[0] ? companyObject[0].id : null,
          year: item['Fiscal Year'],
          fiscalYearEndDate: item['Fiscal Year End Date'],
          status: true,
          createdBy: userDetail
        };
        kmpMembersList.push(memberDetail);
      });

      return {
        datapointId: datapointObject[0] ? datapointObject[0].id : null,
        companyId: companyObject[0] ? companyObject[0].id : null,
        year: item['Fiscal Year'],
        response: item['Response'] ? item['Response'] : '',
        fiscalYearEndDate: item['Fiscal Year End Date'],
        status: true,
        createdBy: userDetail
      }
    });
    await KmpMatrixDataPoints.updateMany({
      "companyId": { $in: insertedCompanyIds },
      "year": { $in: distinctYears }
    }, { $set: { status: false } }, {});
    await KmpMatrixDataPoints.insertMany(kmpMembersList)
      .then((err, result) => {
        if (err) {
          console.log('error', err);
        } else {
          //  console.log('result', result);
        }
      });

    console.log(structuredCompanyDetails )
    console.log(structuredCompanyDetails)
   // res.json({ message: "Files upload success", companies: structuredCompanyDetails, allStandaloneDetails: structuredStandaloneDetails, allBoardMemberMatrixDetails: boardMembersList, allKmpMatrixDetails: kmpMembersList, data: allFilesObject });
    res.json({ message: "Files upload success", companies: structuredCompanyDetails})
   });
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  StandaloneDatapoints.count(query)
    .then(count => StandaloneDatapoints.find(query, select, cursor)
      .populate('createdBy')
      .populate('companyId')
      .populate('taskId')
      .populate('datapointId')
      .then((standaloneDatapoints) => ({
        count,
        rows: standaloneDatapoints.map((standaloneDatapoints) => standaloneDatapoints.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  StandaloneDatapoints.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .populate('taskId')
    .populate('datapointId')
    .then(notFound(res))
    .then((standaloneDatapoints) => standaloneDatapoints ? standaloneDatapoints.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  StandaloneDatapoints.findById(params.id)
    .populate('createdBy')
    .populate('companyId')
    .populate('taskId')
    .populate('datapointId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((standaloneDatapoints) => standaloneDatapoints ? Object.assign(standaloneDatapoints, body).save() : null)
    .then((standaloneDatapoints) => standaloneDatapoints ? standaloneDatapoints.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  StandaloneDatapoints.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((standaloneDatapoints) => standaloneDatapoints ? standaloneDatapoints.remove() : null)
    .then(success(res, 204))
    .catch(next)
