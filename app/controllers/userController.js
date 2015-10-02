var User = require('../models/user');

exports.getAll = function(req,res) {
    var result = User.getAllUsers(function(result){
        if (result.length) {
            res.send(result);
        } else {
            res.send('No document(s) found with defined criteria!');
        }
    });
};

exports.createUser = function (req,res) {
    var result = User.createUser(userObj, function(result){
        if (result.length) {
            res.send('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        } else {
            res.send('Error');
        }
    });
};

exports.getUser = function (req, res) {
    var result = User.getAllUserById(req.params.id, function(result){
        if (result.length) {
            res.send(result);
        } else {
            res.send('No document(s) found with defined criteria!');
        }
    });
};

exports.updateUser = function (req, res) {

//res.send('change user by his id - '+req.params.id);
    //collection.updateOne({name: 'modulus user'}, {$set: {enabled: false}}, function (err, numUpdated) {
    //    if (err) {
    //        console.log(err);
    //    } else if (numUpdated) {
    //        console.log('Updated Successfully %d document(s).', numUpdated);
    //        res.send(numUpdated);
    //    } else {
    //        console.log('No document found with defined "find" criteria!');
    //    }
    //});
};

exports.deleteUser = function (req, res) {
    var result = User.deleteUser(req.params.id, function(result){
        if (result.length) {
            res.send('Deleted %d documents in the "users" collection. Deleted document with "_id":', result.length, req.params.id);
        } else {
            res.send('Error');
        }
    });
};