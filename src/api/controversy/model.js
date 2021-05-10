import mongoose, { Schema } from 'mongoose'

const controversySchema = new Schema({
  dpCodeId: {
  //  type: Schema.Types.ObjectId, 
  //  ref: 'Datapoints'
  
  },
  companyId: {
  //  type: Schema.Types.ObjectId, 
  //  ref: 'Company'
  
  },
  year: {
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
  response: {
    type: String
  },
  submittedDate: {
    type: String
  },
  submittedBy: {
    type: String
  },
  activeStatus: {
    type: String
  },
  status: {
    type: String
  },
  createdBy: {
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

controversySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      dpCodeId: this.dpCodeId,
      companyId: this.companyId,
      year: this.year,
      sourceName: this.sourceName,
      sourceUrl: this.sourceUrl,
      sourcePublicationDate: this.sourcePublicationDate,
      response: this.response,
      submittedDate: this.submittedDate,
      submittedBy: this.submittedBy,
      activeStatus: this.activeStatus,
      status: this.status,
      createdBy: this.createdBy,
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

const model = mongoose.model('Controversy', controversySchema)

export const schema = model.schema
export default model
