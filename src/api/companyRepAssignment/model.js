import mongoose, { Schema } from 'mongoose'

const companyRepAssignmentSchema = new Schema({
  userId: {
    type: String
  },
  assignedId: {
    type: String
  },
  assignedDate: {
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

companyRepAssignmentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId,
      assignedId: this.assignedId,
      assignedDate: this.assignedDate,
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

const model = mongoose.model('CompanyRepAssignment', companyRepAssignmentSchema)

export const schema = model.schema
export default model
