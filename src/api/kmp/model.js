import mongoose, { Schema } from 'mongoose'

const kmpSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  companyId: {
   type: Schema.ObjectId,
    ref: 'Companies',
    required: true
  },
  kmpMemberName: {
    type: String
  },
  memberStatus: {
    type: String
  },
  year: {
    type: String
  },
  status: {
    type: Boolean,
    default:true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

kmpSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null ,
      companyId: this.companyId ? this.companyId.view(full) :null ,
      kmpMemberName: this.kmpMemberName,
      memberStatus: this.memberStatus,
      year: this.year,
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

const model = mongoose.model('Kmp', kmpSchema)

export const schema = model.schema
export default model
