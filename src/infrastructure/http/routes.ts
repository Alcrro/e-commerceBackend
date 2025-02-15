import { Router } from 'express';
import userRouter from './UserRoute';
import authRouter from './authRoutes';
import { notificationRouter } from './notificationRoutes';
import favoriteRoute from './favoriteRoutes';

import cartRouter from './cartRoutes';
import { productRouter } from './productRoutes';
import { addressRoute } from './addressRoutes';
import { homeMetadataRouter } from './metadata/homeRoutes';
import { orderRouter } from './OrderRoutes';

const routers: Router = Router();

// Use the individual route modules for each feature
routers.use('/user', userRouter);
routers.use('/auth', authRouter);
routers.use('/notification', notificationRouter);
routers.use('/favorite', favoriteRoute);
routers.use('/product', productRouter);
routers.use('/cart', cartRouter);
routers.use('/address', addressRoute);
routers.use('/order', orderRouter);
routers.use('/metadata', homeMetadataRouter);

export default routers;
