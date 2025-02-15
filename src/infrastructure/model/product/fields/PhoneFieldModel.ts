import ProductFields from './ProductFieldModel';

const phoneFields = new ProductFields({
  category: 'phone',
  fields: [
    {
      label: 'Processor',
      name: 'processor',
      type: 'select',
      modelOptions: {
        'iPhone 13': ['Apple A15 Bionic'],
        'Samsung Galaxy S21': ['Qualcomm Snapdragon 888', 'Exynos 2100'],
        'OnePlus 9': ['Snapdragon 888', 'Snapdragon 870'],
      },
    },
    {
      label: 'Camera',
      name: 'camera',
      type: 'text',
      modelOptions: {
        'iPhone 13': ['12MP', '12MP Ultra-Wide'],
        'Samsung Galaxy S21': ['64MP', '12MP Ultra-Wide'],
        'OnePlus 9': ['48MP', '16MP Ultra-Wide'],
      },
    },
    {
      label: 'Battery',
      name: 'battery',
      type: 'text',
      modelOptions: {
        'iPhone 13': ['3095mAh'],
        'Samsung Galaxy S21': ['4000mAh'],
        'OnePlus 9': ['4500mAh'],
      },
    },
  ],
});

// Save to database
async function seedFields() {
  await phoneFields.save();
  console.log('Phone fields seeded with model-based options');
}

seedFields().catch(console.error);
