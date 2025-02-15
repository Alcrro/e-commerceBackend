import mongoose, { Schema } from 'mongoose';

const productFieldsSchema = new Schema({
  category: { type: String, required: true }, // e.g., 'phone', 'laptop'
  fields: [
    {
      label: { type: String, required: true }, // Field label (e.g., "Processor")
      name: { type: String, required: true }, // Field name (e.g., "processor")
      type: { type: String, required: true }, // Field type (e.g., "text", "select")
      modelOptions: {
        type: Map,
        of: [String], // A map where keys are model names and values are enum options
        required: true,
      },
    },
  ],
});

const ProductFields = mongoose.model('ProductFields', productFieldsSchema);

export default ProductFields;
