import mongoose, { Schema } from 'mongoose'

const boardMatrixDatapointsSchema = new Schema({
  dpCodeId: {
    type: String
  },
  boardMemberId: {
    type: String
  },
  year: {
    type: String
  },
  response: {
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

boardMatrixDatapointsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      dpCodeId: this.dpCodeId,
      boardMemberId: this.boardMemberId,
      year: this.year,
      response: this.response,
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

const model = mongoose.model('BoardMatrixDatapoints', boardMatrixDatapointsSchema)

export const schema = model.schema
export default model
