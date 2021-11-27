const createError = require('http-errors');
const debug = require('debug')('app:module-products-controller');

const { ProductsService } = require('./services');
const { Response } = require('../common/response');

module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            let products = await ProductsService.getAll();
            Response.success(res, 200, 'Lista de productos', products)
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            let product = await ProductsService.getById(id);
            if(!product){
                Response.error(res, new createError.NotFound());
            }else{
                Response.success(res, 200, `Producto ${id}`, product)
            }
        } catch (error) {
            debug(error);
            Response.error(res);

        }
    },
    createProducts: async (req, res) => {
        try {
            const { body } = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
            } else{
                const insertedId = await ProductsService.create(body);
                Response.success(res, 201, 'Producto agregado', insertedId);               
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            const { body } = req;
            let product = await ProductsService.update(id, body);
            
            if(!product){
                Response.error(res, new createError.NotFound());
            }else{
                Response.success(res, 200, `Producto ${id} modificado`, Object(body));
            }
            

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    deleteProduct: async (req, res, id) =>{
        try {
            const { params: { id } } = req;
            let productdb = await ProductsService.getById(id);
            let product = await ProductsService.deletee(id);

            if(product.deleteCount ===1){
                Response.error(res, new createError.NotFound());
            }else{
                Response.success(res, 200, `Producto ${id} eliminado`, productdb);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    generateReport: (req,res)=> {
        try{
        ProductsService.generateReport('Inventario',res)
        }catch(error){
            debug(error);
            Response.error(res);
        }
    }
}