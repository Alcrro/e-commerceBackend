import { Favorite } from './../../domain/entities/Favorite';
import mongoose, { Schema, Types } from 'mongoose';

// Define the schema for "Favorite"
const FavoriteSchema = new Schema<Favorite & { userId: Schema.Types.ObjectId }>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    nameList: {
      type: [String],
      default: ['favorite'],
    },
    productCartList: [
      {
        productId: {
          type: Types.ObjectId, // Assuming product ID is an ObjectId
          ref: 'Product',
          required: true,
        },
        price: {
          type: Number,
          required: true, // Price should be required
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, // Default quantity to 1 if not specified
        },
        listName: {
          type: String,
        },
      },
    ],
    subTotal: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual field to populate product details
FavoriteSchema.virtual('productCartList.productDetails', {
  ref: 'Product', // The model to populate from
  localField: 'productCartList.productId', // Field in the CartSchema
  foreignField: '_id', // Matching field in ProductSchema
  justOne: true, // Set to false if expecting multiple results
});

// Avoid redeclaration and correct the model initialization
const FavoriteModel =
  mongoose.models.Favorite ||
  mongoose.model<Favorite & { userId: Schema.Types.ObjectId }>(
    'Favorite',
    FavoriteSchema
  );

export default FavoriteModel;
