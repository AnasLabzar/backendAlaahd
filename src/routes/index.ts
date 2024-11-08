import express from 'express';
import authentication from './authentication';
import users from './userRoutes';
import product from './productRoutes';
import category from './categoryRoutes';
import colors from './colorRoutes';
import sku from './skuRoutes';
import prices from './priceRoutes';
import orders from './orderRoutes';
import invoice from './invoiceRoutes';

const router = express.Router();

export default (): express.Router => {
    // Initialize each route with only the router parameter, as observed
    authentication(router);
    users(router);
    product(router);
    category(router);
    sku(router);
    colors(router);
    prices(router);
    orders(router);
    invoice(router);

    return router;
};
