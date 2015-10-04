var validationSchema = require('./scheme'),
    userModel = [];

    module.exports = {
    registerModel: function (name, model) {
        if (!!userModel[name]) {
            console.log('Model ' + name + ' is already in the system.');
            return false;
        }
        var schema = [];
        for (var prop in model) {
            var type = model[prop].type;
            if (!validationSchema[type]) {
                console.log('validationSchema does not have ' + type +
                ' type, please update validationSchema or register new Model');
                return false;
            }
            schema[prop] = validationSchema[type].validate(model[prop]);
        }
        userModel[name] = schema;
    },
    validate: function (name, object) {
        if (!userModel[name]) {
            console.log(name + ' is not registered!');
            return false;
        }
        var schema = userModel[name];
        for (var prop in schema) {
            if (!schema[prop].call(object[prop])) {
                console.log(object[prop] + ' is not valid value for ' + prop +
                ' in this scheme. Please, check your object and registered model.');
                return false;
            }
        }
        return true;
    },
    dispose: function () {
        userModel = [];
    }
};
