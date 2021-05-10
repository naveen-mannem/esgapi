import mongoose, { Schema } from 'mongoose'

const boardMembersSchema = new Schema({
  companyId: {
    type: String
  },
  boardMemberName: {
    type: String
  },
  memberStatus: {
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

boardMembersSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      companyId: this.companyId,
      boardMemberName: this.boardMemberName,
      memberStatus: this.memberStatus,
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

const model = mongoose.model('BoardMembers', boardMembersSchema)

export const schema = model.schema
export default model
