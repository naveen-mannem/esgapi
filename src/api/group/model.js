import mongoose, { Schema } from 'mongoose'

const groupSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  groupName: {
    type: String
  },
  groupAdmin: {
    type: String
  },
  batchId: {
    type: Schema.ObjectId,
    ref: 'Batches',
    required: true
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

groupSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      groupName: this.groupName,
      groupAdmin: this.groupAdmin,
      batchId: this.batchId ? this.batchId.view(full) : null,
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

const model = mongoose.model('Group', groupSchema)

export const schema = model.schema
export default model
