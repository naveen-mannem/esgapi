import mongoose, { Schema } from 'mongoose'

const groupQaSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  userId: {
   type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  groupId: {
    type: Schema.ObjectId,
    ref: 'Group',
    required: true
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

groupQaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      userId: this.userId ? this.userId.view(full) : null,
      groupId: this.groupId ? this.groupId.view(full) : null,
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

const model = mongoose.model('GroupQa', groupQaSchema)

export const schema = model.schema
export default model
