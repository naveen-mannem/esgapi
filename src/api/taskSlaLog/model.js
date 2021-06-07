import mongoose, { Schema } from 'mongoose'

const taskSlaLogSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  taskId: {
   type: Schema.ObjectId,
    ref: 'TaskAssigment',
    required: true
  },
  currentDate: {
    type: String
  },
  preferedDate: {
    type: String
  },
  loggedBy: {
    type: String
  },
  taskStatus: {
    type: String
  },
  status: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

taskSlaLogSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      taskId: this.taskId ? this.taskId.view(full) : null ,
      currentDate: this.currentDate,
      preferedDate: this.preferedDate,
      loggedBy: this.loggedBy,
      taskStatus: this.taskStatus,
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

const model = mongoose.model('TaskSlaLog', taskSlaLogSchema)

export const schema = model.schema
export default model
