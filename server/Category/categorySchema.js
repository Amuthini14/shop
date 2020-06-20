const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let category = new Schema({
    cty_id: {
        type: String
    },
    cty_name: {
        type: String
    }
});

module.exports = mongoose.model('category', category);