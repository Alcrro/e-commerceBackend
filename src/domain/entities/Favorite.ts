export interface Favorite {
  id: string;
  productCartList: [
    {
      productId: string;
      price: number;
      quantity: number;
      listName: string;
    }
  ];
  nameList: string[];
  subTotal: number;
  totalPrice: number;
}
