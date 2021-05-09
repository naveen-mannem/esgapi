import mongoose, { Schema } from 'mongoose'

const rulesSchema = new Schema({
  methodName: {
    type: String
  },
  methodType: {
    type: String
  },
  criteria: {
    type: String
  },
  parameter: {
    type: String
  },
  datapointId: {
    type: String
  },
  status: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

rulesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      methodName: this.methodName,
      methodType: this.methodType,
      criteria: this.criteria,
      parameter: this.parameter,
      datapointId: this.datapointId,
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

const model = mongoose.model('Rules', rulesSchema)

export const schema = model.schema
export default model
