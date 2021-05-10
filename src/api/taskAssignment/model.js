import mongoose, { Schema } from 'mongoose'

const taskAssignmentSchema = new Schema({
  companyId: {
    type: String
  },
  categoryId: {
    type: String
  },
  groupId: {
    type: String
  },
  revisionCode: {
    type: String
  },
  assignedTo: {
    type: String
  },
  year: {
    type: String
  },
  analystSLA: {
    type: String
  },
  taskStatus: {
    type: String
  },
  analystEmail: {
    type: String
  },
  qaEmail: {
    type: String
  },
  qaSLA: {
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

taskAssignmentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      companyId: this.companyId,
      categoryId: this.categoryId,
      groupId: this.groupId,
      revisionCode: this.revisionCode,
      assignedTo: this.assignedTo,
      year: this.year,
      analystSLA: this.analystSLA,
      taskStatus: this.taskStatus,
      analystEmail: this.analystEmail,
      qaEmail: this.qaEmail,
      qaSLA: this.qaSLA,
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

const model = mongoose.model('TaskAssignment', taskAssignmentSchema)

export const schema = model.schema
export default model
