import mongoose, { Schema, Types } from 'mongoose';
import { Cart } from '../../domain/entities/Cart';

const CartSchema = new Schema<Cart & { userId: Schema.Types.ObjectId }>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    productCartList: [
      {
        productId: {
          type: Types.ObjectId,
          ref: 'Product', // Reference to the Product model
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field to populate product details
CartSchema.virtual('productCartList.productDetails', {
  ref: 'Product', // The model to populate from
  localField: 'productCartList.productId', // Field in the CartSchema
  foreignField: '_id', // Matching field in ProductSchema
  justOne: true, // Set to false if expecting multiple results
});

const CartModel = mongoose.models.Cart || mongoose.model('Cart', CartSchema);

export default CartModel;
