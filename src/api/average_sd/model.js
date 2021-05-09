import mongoose, { Schema } from 'mongoose'

const averageSdSchema = new Schema({
  companyId: {
    type: Schema.ObjectId,
    ref: 'Companies',
    required: true
  },
  year: {
    type: String
  },
  stdDeviation: {
    type: String
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

averageSdSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      companyId: this.companyId ? this.companyId.view(full) : null,
      year: this.year,
      stdDeviation: this.stdDeviation,
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

const model = mongoose.model('AverageSd', averageSdSchema)

export const schema = model.schema
export default model
