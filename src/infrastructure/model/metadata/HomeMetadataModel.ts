import mongoose from 'mongoose';
import { IMetadata } from '../../../domain/entities/metadata/Home';

const MetadataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    keywords: [{ type: String, trim: true }],
    author: { type: String, trim: true },
    ogTitle: { type: String, trim: true },
    ogDescription: { type: String, trim: true },
    ogImage: { type: String, trim: true },
    twitterCard: { type: String, trim: true },
    canonicalUrl: { type: String, trim: true },
    robotsMeta: { type: String, trim: true, default: 'index, follow' },
    theme: { type: String, trim: true },
    layout: { type: String, trim: true },
    customCSS: { type: String },
    scripts: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
    bannerImage: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const HomePageSchema = new mongoose.Schema(
  {
    metadata: { type: MetadataSchema, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMetadata>('HomePage', HomePageSchema);
