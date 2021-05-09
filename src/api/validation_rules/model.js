import mongoose, { Schema } from 'mongoose'

const validationRulesSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  ruleName: {
    type: String
  },
  condition: {
    type: String
  },
  criteria: {
    type: String
  },
  minimumValue: {
    type: String
  },
  maximumValue: {
    type: String
  },
  dependantDPCodes: {
    type: String
  },
  datapointId: {
    type: Schema.ObjectId,
    ref: 'Datapoints',
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

validationRulesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      ruleName: this.ruleName,
      condition: this.condition,
      criteria: this.criteria,
      minimumValue: this.minimumValue,
      maximumValue: this.maximumValue,
      dependantDPCodes: this.dependantDPCodes,
      datapointId: this.datapointId ? this.datapointId.view(full) : null,
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

const model = mongoose.model('ValidationRules', validationRulesSchema)

export const schema = model.schema
export default model
