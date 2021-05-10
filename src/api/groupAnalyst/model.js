import mongoose, { Schema } from 'mongoose'

const groupAnalystSchema = new Schema({
  userId: {
    type: String
  },
  groupId: {
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

groupAnalystSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId,
      groupId: this.groupId,
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

const model = mongoose.model('GroupAnalyst', groupAnalystSchema)

export const schema = model.schema
export default model
