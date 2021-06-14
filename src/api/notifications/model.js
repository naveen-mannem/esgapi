import mongoose, { Schema } from 'mongoose'

const notificationsSchema = new Schema({
  notifyToUser: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  notificationType: {
    type: String
  },
  content: {
    type: String
  },
  notificationTitle: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
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

notificationsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      notifyToUser: this.notifyToUser ? this.notifyToUser.view(full) : null,
      notificationType: this.notificationType,
      content: this.content,
      notificationTitle: this.notificationTitle,
      isRead: this.isRead,
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

const model = mongoose.model('Notifications', notificationsSchema)

export const schema = model.schema
export default model
