import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFeedback extends Document {
  type: 'feedback' | 'bug' | 'feature';
  name?: string;
  email?: string;
  message: string;
  toolName?: string;
  status: 'new' | 'reviewed' | 'resolved' | 'archived';
}

const FeedbackSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ['feedback', 'bug', 'feature'],
      required: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    toolName: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'resolved', 'archived'],
      default: 'new',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create model if it doesn't exist
const Feedback: Model<IFeedback> = mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;

