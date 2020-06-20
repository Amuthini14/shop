/**
 * IT16006058
 * Attanayake T.H.M.D.R.M
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


/**
 * Create the schema
 */
const reviewSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    
  },
  
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("reviews",reviewSchema)

