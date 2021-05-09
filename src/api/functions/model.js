import mongoose, { Schema } from 'mongoose'

const functionsSchema = new Schema({
  functionType: {
    type: String,
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

functionsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      functionType: this.functionType ? this.functionType : '',
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

const model = mongoose.model('Functions', functionsSchema)

export const schema = model.schema
export default model
