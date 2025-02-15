export interface Cart {
  id: string;

  productCartList: [
    {
      productId: string;
      price: number;
      quantity: number;
    }
  ];
  totalPrice: number;
}
