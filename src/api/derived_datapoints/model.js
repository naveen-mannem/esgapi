import mongoose, { Schema } from 'mongoose'

const derivedDatapointsSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  companyId: {
    type: Schema.ObjectId,
    ref: 'Companies',
    required: true
  },
  datapointId: {
    type: Schema.ObjectId,
    ref: 'Datapoints',
    required: true
  },
  response: {
    type: String
  },
  performanceResult: {
    type: String
  },
  activeStatus: {
    type: String
  },
  dpStatus: {
    type: String
  },
  year: {
    type: String
  },
  fiscalYearEndDate: {
    type: String
  },
  lastModifiedDate: {
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

derivedDatapointsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      companyId: this.companyId ? this.companyId.view(full) : null,
      datapointId: this.datapointId ? this.datapointId.view(full) : null,
      response: this.response,
      performanceResult: this.performanceResult,
      activeStatus: this.activeStatus,
      dpStatus: this.dpStatus,
      year: this.year,
      fiscalYearEndDate: this.fiscalYearEndDate,
      lastModifiedDate: this.lastModifiedDate,
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

const model = mongoose.model('DerivedDatapoints', derivedDatapointsSchema)

export const schema = model.schema
export default model
