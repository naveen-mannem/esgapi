import mongoose, { Schema } from 'mongoose'

const taskSlaLogSchema = new Schema({
  taskId: {
    type: String
  },
  currentDate: {
    type: String
  },
  preferredDate: {
    type: String
  },
  loggedBy: {
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

taskSlaLogSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      taskId: this.taskId,
      currentDate: this.currentDate,
      preferredDate: this.preferredDate,
      loggedBy: this.loggedBy,
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

const model = mongoose.model('TaskSlaLog', taskSlaLogSchema)

export const schema = model.schema
export default model
