/**
 * IT16006058
 * Attanayake T.H.M.D.R.M
 */
const express = require("express");
const router = express.Router();
const reviews = require("../models/Reviews");


/**
 * @POST method
 * Adding a review for the product
 */
router.route('/add-review').post((req, res, next) => {
    reviews.create(req.body, (error, data) => {
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
 * List down all the reviews
 */
router.route('/display-review').get((req, res) => {
    reviews.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


/**
 * @GET method
 * Searching a review by id
 */
router.route('/search-review/:id').get((req, res) => {
    reviews.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


/**
 * @PUT method
 * Edit reviews
 */
router.route('/update-review/:id').put((req, res, next) => {
    reviews.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Review updated successfully !')
        }
    })
});


/**
 * @DELETE method
 * Deleting a review
 */
router.route('/delete-review/:id').delete((req, res, next) => {
    reviews.findByIdAndRemove(req.params.id, (error, data) => {
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