import mongoose, { Schema } from 'mongoose'

const polarityRuleSchema = new Schema({
  createdBy: {
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
  datapointId: {
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
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      polarityName: this.polarityName,
      polarityValue: this.polarityValue,
      condition: this.condition,
      datapointId: this.datapointId ? this.datapointId.view(full) : null ,
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
