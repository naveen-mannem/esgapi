import mongoose, { Schema } from 'mongoose'

const boardMembersMatrixDataPointsSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  datapointId: {
   type: Schema.ObjectId,
    ref: 'Datapoints',
    required: true
  },
  companyId: {
   type: Schema.ObjectId,
    ref: 'Companies',
    required: true
  },
  memberName: {
    type: String
  },
  year: {
    type: String
  },
  response: {
    type: String
  },
  fiscalYearEndDate:{
    type:String
  },
  memberStatus: {
    type: Boolean
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

boardMembersMatrixDataPointsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      datapointId: this.datapointId ? this.datapointId.view(full) : null,
      companyId: this.companyId.view(full) ? this.companyId.view(full) : null,
      memberName: this.memberName,
      year: this.year,
      response: this.response,
      fiscalYearEndDate: this.fiscalYearEndDate,
      memberStatus: this.memberStatus,
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

const model = mongoose.model('BoardMembersMatrixDataPoints', boardMembersMatrixDataPointsSchema)

export const schema = model.schema
export default model
