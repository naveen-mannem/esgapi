import mongoose, { Schema } from 'mongoose'

const keyIssuesSchema = new Schema({
  keyIssueName: {
    type: String,
    required: true
  },
  keyIssueCode: {
    type: String,
    required: true
  },
  keyIssueDescription: {
    type: String,
    default: ''
  },
  themeId: {
    type: Schema.ObjectId,
    ref: 'Themes',
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

keyIssuesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      keyIssueName: this.keyIssueName ? this.keyIssueName : '',
      keyIssueCode: this.keyIssueCode ? this.keyIssueCode : '',
      keyIssueDescription: this.keyIssueDescription ? this.keyIssueDescription : '',
      themeId: this.themeId ? this.themeId.view(full) : null,
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

const model = mongoose.model('KeyIssues', keyIssuesSchema)

export const schema = model.schema
export default model
