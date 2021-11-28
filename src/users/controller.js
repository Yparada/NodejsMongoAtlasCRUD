const createError = require('http-errors');
const { UsersService } = require('./services');
const debug = require('debug')['app:module-users-controller'];
const { Response } =require('../common/response');

 const createUsers = async (req, res) => {
    try {
        const { body } = req;

        if(!body || Object.keys(body).length === 0){
            Response.error(res, new createError.BadRequest())
        } else{
            const insertedId = await UsersService.create(body);
            Response.success(res, 201, 'Usuario agregado', insertedId);               
        }

    } catch (error) {
        console.log('ERROR'+error.message)
        Response.error(res);
    }
}

const getUsers = async(req, res) =>{
    console.log('Entra a controller user');

    try {
        let users = await UsersService.getAll();
        Response.success(res, 200, 'Lista de usuarios', users);

    } catch (error) {
        console.log('ERROR'+error.message)
        Response.error(res);
    }
}

const getUser = async (req, res)=>{
    try {
        const { params: { id }} = req;
        let user = await UsersService.getById(id);

        if(!user){
            Response.error(res, new createError.NotFound());
        }else{
            Response.success(res, 200, `Usuario ${id}`, user)
        }

    } catch (error) {
        console.log('ERROR'+error.message)
        Response.error(res);
    }
}

const updateUser = async (req,res) => {
    try {
        const { params: { id }} = req;
        const { body } = req;
        let user = UsersService.update(id,body);

        if(!user){
            Response.error(res, new createError.NotFound());
        }else{
            Response.success(res, 200, `Usuario ${id} modificado`, Object(body))
        }

    } catch (error) {
        console.log('ERROR'+error.message)
        Response.error(res);
    }
}

const deleteUser = async(req,res) =>{
    try {
        const { params: { id }} = req;
        let productdb = await UsersService.getById(id);
        let user = await UsersService.deletee(id);

        if(user.deleteCount == 1){
            Response.error(res, new createError.NotFound());
        }else{
            Response.success(res, 200, `Usuario ${id} eliminado`, productdb);
        }

    } catch (error) {
        console.log('ERROR'+error.message)
        Response.error(res);
    }
}


module.exports.UserController = {
    createUsers,
    getUsers,
    getUser,
    updateUser,
    deleteUser
    

}