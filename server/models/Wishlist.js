/**
 * IT16006058
 * Attanayake T.H.M.D.R.M
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Create the schema
 */
const wishListSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    continents: {
        type: Number,
        default: 1
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}
)


module.exports= mongoose.model('WishList', wishListSchema);
 
