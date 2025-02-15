import { CartRepositoryImpl } from '../../infrastructure/database/cartRepositoryImpl';
import { ClearCart } from '../../use-cases/cart/clearCart';
import { deleteCart } from '../../use-cases/cart/deleteCart';
import { GetCart } from '../../use-cases/cart/getCart';
import { SaveCart } from '../../use-cases/cart/saveCart';
import { CartController } from '../controllers/CartController';

export const makeCartController = (): CartController => {
  const cartRepository = new CartRepositoryImpl();
  const saveCartUseCase = new SaveCart(cartRepository);
  const getCartUseCase = new GetCart(cartRepository);
  const clearCartUseCase = new ClearCart(cartRepository);
  const deleteCartUseCase = new deleteCart(cartRepository);

  return new CartController(
    saveCartUseCase,
    getCartUseCase,
    clearCartUseCase,
    deleteCartUseCase
  );
};
