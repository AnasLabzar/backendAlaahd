import express from 'express';
import authentication from './authentication';
import users from './users';
import product from './product';
import category from './category';
import colors from './colors';
import sku from './sku';
import prices from './prices';
import orders from './orders';
import invoice from './invoice';

const router = express.Router();

export default (): express.Router => {
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
