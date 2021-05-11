import mongoose, { Schema } from 'mongoose'

const polarityRuleSchema = new Schema({
  createdAt: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  polarityName: {
    type: String
  },
  polarityValue: {
    type: String
  },
  condition: {
    type: String
  },
  dataPointId: {
    type: Schema.ObjectId,
    ref: 'Datapoints',
    required: true
  },
  status: {
   type:Boolean,
   default:true
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
      createdAt: this.createdAt ? this.createdAt.view(full) : null,
      polarityName: this.polarityName,
      polarityValue: this.polarityValue,
      condition: this.condition,
      dataPointId: this.dataPointId ? this.createdAt.view(full) : null ,
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

const model = mongoose.model('PolarityRule', polarityRuleSchema)

export const schema = model.schema
export default model
