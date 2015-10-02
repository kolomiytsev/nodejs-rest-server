var mongo = require('./db'),
    userColl = mongo.collection('users');

exports.getAllUsers = function(callback) {
    userColl.find().toArray(function(err, result) {
        if (err) {
            console.log(err);
        } else {
            callback(result);
        }
    });

};

exports.createUser = function(userObj, callback) {
    userColl.insertOne(userObj, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            callback(result);
        }
    });
};

exports.getAllUserById = function(userId, callback) {
    userColl.find({_id: userId}).toArray(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            callback(result);
        }
    });
};

exports.updateUser = function(userObj, callback) {

};

exports.deleteUser = function(userId, callback) {
   userColl.deleteOne({_id:userId}).toArray(function (err, result) {
       if (err) {
           console.log(err);
       } else {
           callback(result);
       }
   });
};

