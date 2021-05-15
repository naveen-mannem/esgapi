import mongoose, { Schema } from 'mongoose'

const batchesSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  batchName: {
    type: String
  },
  batchSLA: {
    type: []
  },
  companyId:[{ 
    type: Schema.Types.ObjectId, 
    ref: 'Companies'
  }],
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

batchesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      batchName: this.batchName,
      batchSLA: this.batchSLA,
      companies: this.companyId ,
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

const model = mongoose.model('Batches', batchesSchema)

export const schema = model.schema
export default model
