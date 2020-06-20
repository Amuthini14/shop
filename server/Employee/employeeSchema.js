const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employee = new Schema({
    EmpId: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    city: {
        type: String
    },
    uname: {
        type: String
    },
    password: {
        type: String
    },
    created: {
        type: Boolean
    }
});

module.exports = mongoose.model('employee', employee);