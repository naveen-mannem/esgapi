import mongoose, { Schema } from 'mongoose'

const clientTaxonomySchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  taxonomyName: {
    type: String
  },
  fields:[{fieldName:{
    type: Schema.Types.ObjectId,
    ref: 'MasterTaxonomy',
    required: true
  }}]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

clientTaxonomySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy.view(full),
      taxonomyName: this.taxonomyName,
      fields: this.fields,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('ClientTaxonomy', clientTaxonomySchema)

export const schema = model.schema
export default model
