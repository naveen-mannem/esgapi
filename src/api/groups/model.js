import mongoose, { Schema } from 'mongoose'

const groupsSchema = new Schema({
  groupName: {
    type: String
  },
  groupAdmin: {
    type: String
  },
  batchId: {
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

groupsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      groupName: this.groupName,
      groupAdmin: this.groupAdmin,
      batchId: this.batchId,
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

const model = mongoose.model('Groups', groupsSchema)

export const schema = model.schema
export default model
