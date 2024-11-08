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
    // Updated to include the required path and options (if any)
    authentication(router, '/auth', null);
    users(router, '/users', null);
    product(router, '/products', null);
    category(router, '/categories', null);
    sku(router, '/sku', null);
    colors(router, '/colors', null);
    prices(router, '/prices', null);
    orders(router, '/orders', null);
    invoice(router, '/invoices', null);

    return router;
};
