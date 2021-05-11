import mongoose, { Schema } from 'mongoose'

const controversySchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  dpCodeId: {
   type: Schema.ObjectId,
    ref: 'Datapoints',
    required: true
  },
  companyId: {
   type: Schema.ObjectId,
    ref: 'Companies',
    required: true
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
  activeStatus: {
    type: String
  },
  submittedBy: {
    type: String
  },
  submittedDate: {
    type: String
  },
  response: {
    type: String
  },
  status:{
    type:Boolean,
    default:true
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
      createdBy: this.createdBy ? this.createdBy.view(full) : null,
      dpCodeId: this.dpCodeId ? this.dpCodeId.view(full) : null ,
      companyId: this.companyId ? this.companyId.view(full) : null,
      year: this.year,
      sourceName: this.sourceName,
      sourceUrl: this.sourceUrl,
      sourcePublicationDate: this.sourcePublicationDate,
      activeStatus: this.activeStatus,
      submittedBy: this.submittedBy,
      submittedDate: this.submittedDate,
      response: this.response,
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
