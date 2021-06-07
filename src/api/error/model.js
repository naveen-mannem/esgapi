import mongoose, { Schema } from 'mongoose'

const errorSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  errorType: {
    type: String
  },
  errorBucket: {
    type: String
  },
  errorDefenition: {
    type: String
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

errorSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      errorType: this.errorType,
      errorBucket: this.errorBucket,
      errorDefenition: this.errorDefenition,
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

const model = mongoose.model('Error', errorSchema)

export const schema = model.schema
export default model
