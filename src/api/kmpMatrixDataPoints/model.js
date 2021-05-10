import mongoose, { Schema } from 'mongoose'

const kmpMatrixDataPointsSchema = new Schema({
  kmpId: {
    type: String
  },
  dpCodeId: {
    type: String
  },
  response: {
    type: String
  },
  year: {
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

kmpMatrixDataPointsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      kmpId: this.kmpId,
      dpCodeId: this.dpCodeId,
      response: this.response,
      year: this.year,
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

const model = mongoose.model('KmpMatrixDataPoints', kmpMatrixDataPointsSchema)

export const schema = model.schema
export default model
