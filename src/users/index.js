const express = require('express'); 
const { UserController } = require('./controller');
const router = express.Router();

module.exports.UsersAPI = (app) => {
    router
    
    .get('/', UserController.getUsers)
    .post('/', UserController.createUsers)
    .get('/:id', UserController.getUser)
    .put('/:id', UserController.updateUser)
    .delete('/:id', UserController.deleteUser)

     app.use('/api/users', router);

}
