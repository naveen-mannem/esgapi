import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

const roles = ['user', 'admin']

const userSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  roleId: {
    type: Schema.ObjectId,
    ref: 'Role',
    required: true
  },
  otp: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'user'
  },
  picture: {
    type: String,
    trim: true
  },
  status: {
    type: Boolean,
    default: true
  },
  firstName:{
    type: String,
    required:false
  },
  middleName:{
    type: String,
    required:false
  },
  lastName:{
    type: String,
    required:false
  },
  
  phoneNumber:{
    type: String,
    required:false
  },
  PANCard:{
    type: String,
    required:false
  },
  adharCard:{
    type: String,
    required:false
  },
  bankAccountNumber:{
    type: String,
    required:false
  },
  bankIFSCCode:{
    type: String,
    required:false
  },
  nameOfTheAccountHolder:{
    type: String,
    required:false
  },
  pancardUpload:{
    type: String,
    required:false
  },
  aadharUpload:{
    type: String,
    required:false
  },
  cancelledchequeUpload:{
    type: String,
    required:false
  },
  authendicationLetter:{
    type: String,
    required:false
  },
  companyName:[],
  companyIdCard:{
    type: String,
    required:false
  }
}, {
  timestamps: true
})

userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1')
  }

  return email
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view (full) {
    const view = {}
    let fields = ['id', 'name', 'role', 'roleId', 'picture', 'status']

    if (full) {
      fields = [...fields, 'email', 'createdAt']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }

}

userSchema.statics = {
  roles
}

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] })

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
