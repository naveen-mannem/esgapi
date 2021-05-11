import mongoose, { Schema } from 'mongoose'

const referenceSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  standaloneId: {
    type: Schema.ObjectId,
    ref: 'StandaloneDatapoints',
    required: true
  },
  sourceName: {
    type: String
  },
  url: {
    type: String
  },
  pageNumber: {
    type: String
  },
  publicationDate: {
    type: String
  },
  textSnippet: {
    type: String
  },
  screenshotInPNG: {
    type: String
  },
  screenshotType: {
    type: String
  },
  filePath: {
    type: String
  },
  activeStatus: {
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

referenceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      standaloneId: this.standaloneId ? this.standaloneId.view(full) : null,
      sourceName: this.sourceName,
      url: this.url,
      pageNumber: this.pageNumber,
      publicationDate: this.publicationDate,
      textSnippet: this.textSnippet,
      screenshotInPNG: this.screenshotInPNG,
      screenshotType: this.screenshotType,
      filePath: this.filePath,
      activeStatus: this.activeStatus,
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

const model = mongoose.model('Reference', referenceSchema)

export const schema = model.schema
export default model
