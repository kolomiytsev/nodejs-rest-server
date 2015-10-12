var mongo = require('./db'),
    userColl = mongo.collection('users');

exports.getAllUsers = function(callback) {
    userColl.find().toArray(function(err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });

};

exports.createUser = function(userObj, callback) {
    userColl.insertOne(userObj, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(err, result);
        }
    });
};

exports.getAllUserById = function(userId, callback) {
    userColl.find({_id: userId}).toArray(function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
};

exports.updateUser = function(userId, userObj, callback) {
    userColl.update({_id:userId}, userObj, function (err, result){
       if(err) {
           callback(err);
       } else {
           callback(null, result);
       }
    });
};

exports.deleteUser = function(userId, callback) {
   userColl.remove({_id:userId}, function (err, result) {
       if (err) {
           callback(err);
       } else {
           callback(null, result);
       }
   });
};

