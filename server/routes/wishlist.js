/**
 * IT16006058
 * Attanayake T.H.M.D.R.M
 */
const express = require("express");
const router = express.Router();
const wishlist = require("../models/Wishlist");


/**
 * @POST method
 * Add item to the wishlist
 */
router.route('/add-wishlist').post((req, res, next) => {
    wishlist.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});


/**
 * @GET method
 * List all items in the wishlist
 */
router.route('/display-wishlist').get((req, res) => {
    wishlist.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


/**
 * @GET method
 * Searching a item in the wishlist by id
 */
router.route('/search-wishlist/:id').get((req, res) => {
    reviews.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


/**
 * @DELETE method
 * Removing an item in the wishlist
 */
router.route('/delete-wishlist/:id').delete((req, res, next) => {
    wishlist.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})


module.exports = router;