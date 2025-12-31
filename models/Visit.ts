import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVisit extends Document {
  date: string; // Format: YYYY-MM-DD
  dailyVisits: number;
  lastUpdated: Date;
}

const VisitSchema: Schema = new Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    dailyVisits: {
      type: Number,
      required: true,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create model if it doesn't exist
const Visit: Model<IVisit> = mongoose.models.Visit || mongoose.model<IVisit>('Visit', VisitSchema);

export default Visit;

