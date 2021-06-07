import mongoose, { Schema } from 'mongoose'

const roleSchema = new Schema({
  roleName: {
    type: String,
    required:true
  },
  roleCode: {
    type: String,
    required:true
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

roleSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      roleName: this.roleName,
      roleCode: this.roleCode,
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

const model = mongoose.model('Role', roleSchema)

export const schema = model.schema
export default model
