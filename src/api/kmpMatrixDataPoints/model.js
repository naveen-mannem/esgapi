import mongoose, { Schema } from 'mongoose'

const kmpMatrixDataPointsSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  kmpId: {
    type: Schema.ObjectId,
    ref: 'kmp',
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
  year: {
    type: String
  },
  fiscalYearEndDate: {
    type: String
  },
  status: {
    type: Boolean,
    default:true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

kmpMatrixDataPointsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null ,
      kmpId: this.kmpId ? this.kmpId.view(full) : null ,
      datapointId: this.datapointId ? this.datapointId.view(full) : null ,
      response: this.response,
      year: this.year,
      fiscalYearEndDate: this.fiscalYearEndDate,
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

const model = mongoose.model('KmpMatrixDataPoints', kmpMatrixDataPointsSchema)

export const schema = model.schema
export default model
