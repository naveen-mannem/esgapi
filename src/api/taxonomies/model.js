import mongoose, { Schema } from 'mongoose'

const taxonomiesSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  categoryId: {
    type: Schema.ObjectId,
    ref: 'Categories',
    required: true
  },
  themeId: {
    type: Schema.ObjectId,
    ref: 'Themes',
    required: true
  },
  keyIssueId: {
    type: Schema.ObjectId,
    ref: 'KeyIssues',
    required: true
  },
  datapointId: {
    type: Schema.ObjectId,
    ref: 'Datapoints',
    required: true
  },
  indicatorName: {
    type: String
  },
  indicatorDescription: {
    type: String
  },
  indicatorPolarity: {
    type: String
  },
  dataCollectionGuide: {
    type: String
  },
  unit: {
    type: String
  },
  dataInput: {
    type: String
  },
  isApplicableSector: {
    type: Boolean,
    default: false
  },
  notApplicableReason: {
    type: String,
    default: ''
  },
  datapointType: {
    type: String
  },
  datapointReportingPeriod: {
    type: String
  },
  fileDataSource: {
    type: String
  },
  sourceUrl: {
    type: String
  },
  sourcePublicationDate: {
    type: String
  },
  sourcePageNumber: {
    type: String
  },
  sourceTextSnippetOrSnapshot: {
    type: String
  },
  commentsAndCalculations: {
    type: String
  },
  signal: {
    type: String
  },
  controversy: {
    type: String
  },
  controversySnippetOrSnapshot: {
    type: String
  },
  snippetOrSnapshotUrl: {
    type: String
  },
  sourcePublicationDateOfConspiracy: {
    type: String
  },
  conspiracyPageNumber: {
    type: String
  },
  normalizedBy: {
    type: String
  },
  weighted: {
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

taxonomiesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      categoryId: this.categoryId ? this.categoryId.view(full) : null,
      themeId: this.themeId ? this.themeId.view(full) : null,
      keyIssueId: this.keyIssueId ? this.keyIssueId.view(full) : null,
      datapointId: this.datapointId,
      indicatorName: this.indicatorName,
      indicatorDescription: this.indicatorDescription,
      indicatorPolarity: this.indicatorPolarity,
      dataCollectionGuide: this.dataCollectionGuide,
      unit: this.unit,
      dataInput: this.dataInput,
      isApplicableSector: this.isApplicableSector,
      notApplicableReason: this.notApplicableReason,
      datapointType: this.datapointType,
      datapointReportingPeriod: this.datapointReportingPeriod,
      fileDataSource: this.fileDataSource,
      sourceUrl: this.sourceUrl,
      sourcePublicationDate: this.sourcePublicationDate,
      sourcePageNumber: this.sourcePageNumber,
      sourceTextSnippetOrSnapshot: this.sourceTextSnippetOrSnapshot,
      commentsAndCalculations: this.commentsAndCalculations,
      signal: this.signal,
      controversy: this.controversy,
      controversySnippetOrSnapshot: this.controversySnippetOrSnapshot,
      snippetOrSnapshotUrl: this.snippetOrSnapshotUrl,
      sourcePublicationDateOfConspiracy: this.sourcePublicationDateOfConspiracy,
      conspiracyPageNumber: this.conspiracyPageNumber,
      normalizedBy: this.normalizedBy,
      weighted: this.weighted,
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

const model = mongoose.model('Taxonomies', taxonomiesSchema)

export const schema = model.schema
export default model
