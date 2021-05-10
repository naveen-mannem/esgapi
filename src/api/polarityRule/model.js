import mongoose, { Schema } from 'mongoose'

const polarityRuleSchema = new Schema({
  polarityName: {
    type: String
  },
  polarityValue: {
    type: String
  },
  condition: {
    type: String
  },
  datapointId: {
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

polarityRuleSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      polarityName: this.polarityName,
      polarityValue: this.polarityValue,
      condition: this.condition,
      datapointId: this.datapointId,
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

const model = mongoose.model('PolarityRule', polarityRuleSchema)

export const schema = model.schema
export default model
