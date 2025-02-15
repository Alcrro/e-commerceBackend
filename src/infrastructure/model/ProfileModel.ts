import mongoose, { Schema, Types } from 'mongoose';
import { Profile } from '../../domain/entities/Profile';

const ProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String },
    bio: {
      type: String,
    },
    avatarUrl: { type: String },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default mongoose.model<Profile>('Profile', ProfileSchema);
