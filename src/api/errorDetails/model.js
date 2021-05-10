import mongoose, { Schema } from 'mongoose'

const errorDetailsSchema = new Schema({
  errorTypeId: {
    type: String
  },
  taskId: {
    type: String
  },
  loggedBy: {
    type: String
  },
  comments: {
    type: String
  },
  errorLoggedDate: {
    type: String
  },
  errorStatus: {
    type: String
  },
  standAlonId: {
    type: String
  },
  status: {
    type: String
  },
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

errorDetailsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      errorTypeId: this.errorTypeId,
      taskId: this.taskId,
      loggedBy: this.loggedBy,
      comments: this.comments,
      errorLoggedDate: this.errorLoggedDate,
      errorStatus: this.errorStatus,
      standAlonId: this.standAlonId,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('ErrorDetails', errorDetailsSchema)

export const schema = model.schema
export default model
