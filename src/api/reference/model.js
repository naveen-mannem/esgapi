import mongoose, { Schema } from 'mongoose'

const referenceSchema = new Schema({
  standalonId: {
    type: String
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
  createdBy: {
    type: String
  },
  activeStatus: {
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

referenceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      standalonId: this.standalonId,
      sourceName: this.sourceName,
      url: this.url,
      pageNumber: this.pageNumber,
      publicationDate: this.publicationDate,
      textSnippet: this.textSnippet,
      screenshotInPNG: this.screenshotInPNG,
      screenshotType: this.screenshotType,
      filePath: this.filePath,
      createdBy: this.createdBy,
      activeStatus: this.activeStatus,
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

const model = mongoose.model('Reference', referenceSchema)

export const schema = model.schema
export default model
