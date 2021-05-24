import { success, notFound } from '../../services/response/'
import { User } from '.'
import { sign } from '../../services/jwt'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.count(query)
    .then(count => User.find(query, select, cursor)
    .populate('roleId')
      .then(users => ({
        rows: users.map((user) => user.view()),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const getUsersByRole = ({ params, querymen: { query, select, cursor } }, res, next) => {
  let findQuery = query;
  findQuery.role = params.role ? params.role : '';
  User.count(findQuery)
    .then(count => User.find(findQuery, select, cursor)
    .populate('roleId')
      .then(users => ({
        rows: users.map((user) => user.view()),
        count
      }))
    )
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  User.findById(params.id)
  .populate('roleId')
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) =>
  res.json(user.view(true))

export const create = ({ bodymen: { body } }, res, next) =>
  User.create(body)
    .then(user => {
      sign(user.id)
        .then((token) => ({ token, user: user.view(true) }))
        .then(success(res, 201))
    })
    .catch((err) => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
  .populate('roleId')
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      return result
    })
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      }
      return result
    })
    .then((user) => user ? user.set({ password: body.password }).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)


export const onBoardingEmpolyee=({ bodymen: { body }, params, user }, res, next)=>{

 
var details = Buffer.from(body.onboardingdetails, 'base64'); 

 let onboardDetails = details.toString('ascii');
 
 let parse=JSON.parse(onboardDetails);
 
 User.findOne({email:parse.email,password:parse.password}).then(data=>{if(!data){
   new User({
    firstName:parse.firstName,
    middleName:parse.middleName,
    lastName:parse.lastName,
    email:parse.email,
    phoneNumber:parse.phoneNumber,
    PANCard:parse.PANCard,
    adharCard:parse.adharCard,
    bankAccountNumber:parse.bankAccountNumber,
    bankIFSCCode:parse.bankIFSCCode,
    nameOfTheAccountHolder:parse.nameOfTheAccountHolder,
    password:parse.password,
    pancardUpload:body.pancard,
    aadharUpload:body.aadhar,
    cancelledchequeUpload:body.cancelledcheque,
    roleId:'60a2440d356d366605b04524'
   }).save()
 } else{res.json({status:200,message:'Employee Already Exist'})}}).then(res.json({
  status:200,
  message:"employee Added Successfully"
})).catch(next)
 
}

export const onBoardingClientRep=({ bodymen: { body }, params, user }, res, next)=>{
  var details = Buffer.from(body.onboardingdetails, 'base64'); 

 let onboardDetails = details.toString('ascii');
 
 let parse=JSON.parse(onboardDetails);

 User.findOne({email:parse.email,password:parse.password}).then(data=>{
   if(!data){
     new User({
      name:parse.name,
      email:parse.email,
      phoneNumber:parse.phoneNumber,
      companyName:parse.companyName,
      password:parse.password,
      roleId:'60a243f0356d366605b04522',
      authendicationLetter:parse.authenticationletterforclient,
      companyIdCard:parse.companyidforclient,
     }).save()

   }else{res.json({status:200,
  message:"Client Rep Already Exist"})}
 }).then(res.json({
  status:200,
  message:"Client Rep Added Successfully"
})).catch(next)

}


export const onBoardingCompanyRep=({ bodymen: { body }, params, user }, res, next)=>{
  var details = Buffer.from(body.onboardingdetails, 'base64'); 

  let onboardDetails = details.toString('ascii');
  
  let parse=JSON.parse(onboardDetails);
 
  User.findOne({email:parse.email,password:parse.password}).then(data=>{
    if(!data){
      new User({
       name:parse.name,
       email:parse.email,
       phoneNumber:parse.phoneNumber,
       companyName:parse.companyName,
       password:parse.password,
       roleId:'60a243e1356d366605b04521',
       authendicationLetter:body.authenticationletterforcompany,
       companyIdCard:body.companyidforcompany
      }).save()
 
    }else{res.json({status:200,
    message:'Company Rep Already Exist'})}
  }).then(res.json({
    status:200,
    message:"Company Rep Added Successfully"
  })).catch(next) 

}

