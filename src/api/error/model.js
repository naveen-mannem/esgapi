import mongoose, { Schema } from 'mongoose'

const errorSchema = new Schema({
  errorTypeName: {
    type: String
  },
  errorBucket: {
    type: String
  },
  errorDefinition: {
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

errorSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      errorTypeName: this.errorTypeName,
      errorBucket: this.errorBucket,
      errorDefinition: this.errorDefinition,
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

const model = mongoose.model('Error', errorSchema)

export const schema = model.schema
export default model
