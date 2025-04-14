import { model, Schema } from 'mongoose';
import { Rating } from './../../domain/entities/Rating';

const RatingSchema = new Schema<Rating>(
  {
    userId: {
      type: Schema.Types.ObjectId, // Store as ObjectId
      ref: 'User',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId, // Store as ObjectId
      ref: 'Product',
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, maxlength: 500 },
    images: { type: [String] },
  },
  { timestamps: true }
);

RatingSchema.index({ productId: 1, userId: 1 }, { unique: true });

export const RatingModel = model<Rating>('Rating', RatingSchema);
