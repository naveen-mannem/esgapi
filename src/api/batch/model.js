import mongoose, { Schema } from 'mongoose'

const batchSchema = new Schema({
  batchName: {
    type: String
  },
  batchSLA: {
    type: String
  },
  status: {
    type: String
  },
  createdBy: {
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

batchSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      batchName: this.batchName,
      batchSLA: this.batchSLA,
      status: this.status,
      createdBy: this.createdBy,
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

const model = mongoose.model('Batch', batchSchema)

export const schema = model.schema
export default model
