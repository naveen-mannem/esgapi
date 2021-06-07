import mongoose, { Schema } from 'mongoose'

const validationsSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  datapointId: {
    type: Schema.ObjectId,
    ref: 'Datapoints',
    required: true
  },
  validationRule: {
    type: String
  },
  rule: {
    type: String
  },
  dependantCode: {
    type: String
  },
  condition: {
    type: String
  },
  criteria: {
    type: String
  },
  validationAlert: {
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

validationsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      datapointId: this.datapointId ? this.datapointId.view(full) : null,
      validationRule: this.validationRule,
      rule: this.rule,
      dependantCode: this.dependantCode,
      condition: this.condition,
      criteria: this.criteria,
      validationAlert: this.validationAlert,
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

const model = mongoose.model('Validations', validationsSchema)

export const schema = model.schema
export default model
