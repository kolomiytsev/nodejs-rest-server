module.exports = function(app) {
    var userController = require('./controllers/userController');

    // server routes ===========================================================
    app.get('/users', userController.getAll);
    app.post('/users', userController.createUser);

    app.get('/users/:id', userController.getUser);
    app.patch('/users/:id', userController.updateUser);
    app.delete('/users/:id', userController.deleteUser);
};