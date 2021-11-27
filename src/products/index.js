const express = require('express');

const { ProductsController } = require('./controller');

const router = express.Router();

module.exports.ProductsAPI = (app) => {
    router
    .get('/', ProductsController.getProducts)
    .get('/report', ProductsController.generateReport)
    .delete('/delete/:id', ProductsController.deleteProduct)
    .get('/:id', ProductsController.getProduct)
    .post('/', ProductsController.createProducts)
    //update

    app.use('/api/products', router)
}