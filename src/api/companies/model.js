import mongoose, { Schema } from 'mongoose'

const companiesSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String
  },
  cin: {
    type: String
  },
  nicCode: {
    type: String
  },
  nic: {
    type: String
  },
  nicIndustry: {
    type: String
  },
  isinCode: {
    type: String
  },
  cmieProwessCode: {
    type: String
  },
  socialAnalystName: {
    type: String
  },
  socialQAName: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

companiesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      companyName: this.companyName,
      cin: this.cin,
      nicCode: this.nicCode,
      nic: this.nic,
      nicIndustry: this.nicIndustry,
      isinCode: this.isinCode,
      cmieProwessCode: this.cmieProwessCode,
      socialAnalystName: this.socialAnalystName,
      socialQAName: this.socialQAName,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Companies', companiesSchema)

export const schema = model.schema
export default model
