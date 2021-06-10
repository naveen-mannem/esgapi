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
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  assignedQA: [{ 
    type : Schema.ObjectId, 
    ref: 'User' 
  }],
  assignedAnalyst: [{ 
    type : Schema.ObjectId, 
    ref: 'User' 
  }],
  batchList: [{ 
    type : Schema.ObjectId, 
    ref: 'Batches' 
  }],
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
      groupAdmin: this.groupAdmin ? this.groupAdmin.view(full) : null,
      assignedAnalyst: this.assignedAnalyst ? this.assignedAnalyst : [],
      assignedQA: this.assignedQA ? this.assignedQA : [],
      batchList: this.batchList ? this.batchList : [],
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
