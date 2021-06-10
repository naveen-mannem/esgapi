import mongoose, { Schema } from 'mongoose'

const standaloneDatapointsSchema = new Schema({
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
  performanceResult: {
    type: String
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
  standaloneStatus: {
    type: String
  },
  taskId: {
    type: Schema.ObjectId,
    ref: 'TaskAssignment',
    required: false,
    default: null
  },
  submittedBy: {
    type: String
  },
  submittedDate: {
    type: String
  },
  activeStatus: {
    type: String
  },
  lastModifiedDate: {
    type: String
  },
  modifiedBy: {
    type: String
  },
  isSubmitted: {
    type: Boolean
  },
  standaradDeviation: {
    type: String
  },
  average: {
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

standaloneDatapointsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      companyId: this.companyId ? this.companyId.view(full) : null,
      datapointId: this.datapointId ? this.datapointId.view(full) : null,
      performanceResult: this.performanceResult,
      response: this.response,
      year: this.year,
      fiscalYearEndDate: this.fiscalYearEndDate,
      standaloneStatus: this.standaloneStatus,
      taskId: this.taskId ? this.taskId.view(full) : null,
      submittedBy: this.submittedBy,
      submittedDate: this.submittedDate,
      activeStatus: this.activeStatus,
      standaradDeviation:this.standaradDeviation,
      average:this.average,
      lastModifiedDate: this.lastModifiedDate,
      modifiedBy: this.modifiedBy,
      isSubmitted: this.isSubmitted,
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

const model = mongoose.model('StandaloneDatapoints', standaloneDatapointsSchema)

export const schema = model.schema
export default model
