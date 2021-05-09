import mongoose, { Schema } from 'mongoose'

const datapointsSchema = new Schema({
  updatedBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  code: {
    type: String
  },
  description: {
    type: String
  },
  dataCollection: {
    type: String
  },
  unit: {
    type: String
  },
  signal: {
    type: String
  },
  percentile: {
    type: String
  },
  finalUnit: {
    type: String
  },
  keyIssueId: {
    type: Schema.ObjectId,
    ref: 'KeyIssues',
    required: true
  },
  functionId: {
    type: Schema.ObjectId,
    ref: 'Functions',
    required: true
  },
  dpType: {
    type: String
  },
  year: {
    type: String
  },
  companyTaxonomyId: {
    type: Schema.ObjectId,
    ref: 'CompanyTaxonomies',
    required: true
  },
  dpStatus: {
    type: String
  },
  sourceName: {
    type: String
  },
  sourceUrl: {
    type: String
  },
  sourcePublicationDate: {
    type: String
  },
  pageNumber: {
    type: String
  },
  textSnippet: {
    type: String
  },
  screenshotType: {
    type: String
  },
  filePath: {
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

datapointsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      updatedBy: this.updatedBy ? this.updatedBy.view(full) : null,
      name: this.name,
      code: this.code,
      description: this.description,
      dataCollection: this.dataCollection,
      unit: this.unit,
      signal: this.signal,
      percentile: this.percentile,
      finalUnit: this.finalUnit,
      keyIssueId: this.keyIssueId ? this.keyIssueId.view(full) : null,
      functionId: this.functionId ? this.functionId.view(full) : null,
      dpType: this.dpType,
      year: this.year,
      companyTaxonomyId: this.companyTaxonomyId ? this.companyTaxonomyId.view(full) : null,
      dpStatus: this.dpStatus,
      sourceName: this.sourceName,
      sourceUrl: this.sourceUrl,
      sourcePublicationDate: this.sourcePublicationDate,
      pageNumber: this.pageNumber,
      textSnippet: this.textSnippet,
      screenshotType: this.screenshotType,
      filePath: this.filePath,
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

const model = mongoose.model('Datapoints', datapointsSchema)

export const schema = model.schema
export default model
