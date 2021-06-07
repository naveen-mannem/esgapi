import mongoose, { Schema } from 'mongoose'

const categoriesSchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true
  },
  categoryCode: {
    type: String,
    required: true,
    unique: true
  },
  categoryDescription: {
    type: String,
    default: ''
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

categoriesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      categoryName: this.categoryName ? this.categoryName : '',
      categoryCode: this.categoryCode ? this.categoryCode : '',
      categoryDescription: this.categoryDescription ? this.categoryDescription : '',
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

const model = mongoose.model('Categories', categoriesSchema)

export const schema = model.schema
export default model
