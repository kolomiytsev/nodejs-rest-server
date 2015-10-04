var User = require('../models/user'),
    ObjectValidator = require('../../modules/validator');

ObjectValidator.registerModel("userObj", {
    name: {type:"string", required: true},
    email: {type: "email", required: true},
    metadata: {type: "object"}
});
ObjectValidator.registerModel("userId", {
    _id: {type: "uuid", required: true}
});

exports.getAll = function(req, res, next) {
    var result = User.getAllUsers(function(err, result){
        if (err) {
            return next(err);
        } else if (result.length) {
            res.send(result);
        } else {
            res.send('No document(s) found with defined criteria!');
        }
    });
};

exports.createUser = function (req, res, next) {
    //var userId = req.params.id,
    //    validation = ObjectValidator.validate('userId', {_id: userId});
    //
    //if (!validation) return next(new Error("Validation Error: invalid uuid."));

    //var result = User.createUser(req.body, function(err, result){
    //    if (err) {
    //        return next(err);
    //    } else if (result.length) {
    //        res.send('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
    //    } else {
    //        res.send('Error');
    //    }
    //});
};

exports.getUser = function (req, res, next) {
    var userId = req.params.id,
        validation = ObjectValidator.validate('userId', {_id: userId});

    if (!validation) return next(new Error("Validation Error: invalid uuid."));

    var result = User.getAllUserById(userId, function(err, result){
        if (err) {
            return next(err);
        } else if (result.length) {
            res.send(result);
        } else {
            res.send('No document(s) found with defined criteria!');
        }
    });
};

exports.updateUser = function (req, res, next) {
    var userId = req.params.id,
        validation = ObjectValidator.validate('userId', {_id: userId});

    if (!validation) return next(new Error("Validation Error: invalid uuid."));

    //var result = User.updateUser(userId, req.body, function(err, result){
    //    if (err) {
    //        return next(err);
    //    } else if (result.length) {
    //        res.send(result);
    //    } else {
    //        res.send('Error!');
    //    }
    //});
};

exports.deleteUser = function (req, res, next) {
    var userId = req.params.id,
        validation = ObjectValidator.validate('userId', {_id: userId});

    if (!validation) return next(new Error("Validation Error: invalid uuid."));

    var result = User.deleteUser(userId, function(err, result){
        if (err) {
            return next(err);
        } else if (result.length) {
            res.send('Deleted %d documents in the "users" collection. Deleted document with "_id":', result.length, req.params.id);
        } else {
            res.send('Error');
        }
    });
};