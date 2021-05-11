import mongoose, { Schema } from 'mongoose'

const errorDetailsSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  errorTypeId: {
    type: Schema.ObjectId,
    ref: 'Error',
    required: true
  },
  taskId: {
    type: Schema.ObjectId,
    ref: 'TaskAssignment',
    required: true
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
  standaloneId: {
    type: Schema.ObjectId,
    ref: 'StandaloneDatapoints',
    required: true
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

errorDetailsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      errorTypeId: this.errorTypeId ? this.errorTypeId.view(full) : null,
      taskId: this.taskId ? this.taskId.view(full) : null,
      loggedBy: this.loggedBy,
      comments: this.comments,
      errorLoggedDate: this.errorLoggedDate,
      errorStatus: this.errorStatus,
      standaloneId: this.standaloneId ? this.standaloneId.view(full) : null,
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

const model = mongoose.model('ErrorDetails', errorDetailsSchema)

export const schema = model.schema
export default model
