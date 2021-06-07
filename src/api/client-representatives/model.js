import mongoose, { Schema } from 'mongoose'

const clientRepresentativesSchema = new Schema({
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
  name: {
    type: String
  },
  companyId: {
    type: Schema.ObjectId,
    ref: 'Companies',
    required: true
  },
  authenticationLetterForClientUrl: {
    type: String
  },
  companyIdForClient: {
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

clientRepresentativesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy.view(full),
      userId: this.userId ? this.userId.view(full) : null,
      name: this.name,
      companyId: this.companyId ? this.companyId.view(full) : null,
      authenticationLetterForClientUrl: this.authenticationLetterForClientUrl,
      companyIdForClient: this.companyIdForClient,
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

const model = mongoose.model('ClientRepresentatives', clientRepresentativesSchema)

export const schema = model.schema
export default model
