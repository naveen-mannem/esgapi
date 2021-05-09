import mongoose, { Schema } from 'mongoose'

const themesSchema = new Schema({
  themeName: {
    type: String,
    required: true
  },
  themeCode: {
    type: String,
    required: true
  },
  themeDescription: {
    type: String,
    default: null
  },
  categoryId: {
    type: Schema.ObjectId,
    ref: 'Categories',
    required: true
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

themesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      themeName: this.themeName ? this.themeName : '',
      themeCode: this.themeCode ? this.themeCode : '',
      themeDescription: this.themeDescription ? this.themeDescription : '',
      categoryId: this.categoryId ? this.categoryId.view(full) : null,
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

const model = mongoose.model('Themes', themesSchema)

export const schema = model.schema
export default model
