const express = require('express');
const router = express.Router();
const { User } = require("../models/User"); //bring the User model
const { Product } = require('../models/Product');
const { auth } = require("../middleware/auth");
const { Payment } = require('../models/Payment');
const async = require('async');


//   ******   User Controller  *******

//Routing for Register
//it get the register request from  client
router.post("/register", (req, res) => {

    //put Regidteration info into mongo DB
    const user = new User(req.body);

    //After save info onto db , we get err or data from the mongo db, and those are parameters of the callback function
    //before saving it execute the pre method in User Schema
    user.save((err, doc) => {
        if (err) return res.json({ 
            registerSuccess: false,
            err });

        //if there is no error
        return res.status(200).json({ 
            registerSuccess: true 
        });
    });
});

//Routing For Login
router.post("/login", (req, res) => {

    //find the email in db
    //if the req.body.email not found in db we get err otherwise we get the user object
    User.findOne({ email: req.body.email }, (err, user) => {

        //if there is no user in the db
        if (!user)
            return res.json({
                successLogin: false,
                message: "Authentication failed, Email not found" //this will not be printed in interface
            });
        
        //compare password, it calls the compare Password in the User Model
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ 
                    successLogin: false,
                     message: "The password is incorrect" });

            
            //generate token implemenrted in UserSchema first
            //so first make the generateToken inside User Schema
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                
                res.cookie("a_authExp", user.tokenExp);
                //if not error, put the token inside the cookie
                res
                    .cookie("a_auth", user.token)
                    .status(200)
                    .json({
                        successLogin: true,
                        userId: user._id,
                        //
                       // isAdmin: user.role === 0 ? false : true
                       role: user.role
                    });
            });
        });
    });
});



//Routing for Authentication, and the request is from the auth, and in the auth request it has token and user
router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart
    });
});

//logout Routing
router.get("/logout", auth, (req, res) => {

    //find the loggedin user's id to logout, doc - user info, and req.user._id come from auth middleware
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({
             successLogout: false,
             err });
        return res.status(200).send({
            successLogout: true
        });
    });
});


//Add to cart Routing
router.get('/addToCart', auth, (req, res) => {

    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        let duplicate = false;

        console.log(userInfo)

        userInfo.cart.forEach((item) => {
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        })


        if (duplicate) {
            User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": req.query.productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: req.query.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        }
    })
});

router.get('/removeFromCart', auth, (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": req.query._id } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            Product.find({ '_id': { $in: array } })
                .populate('writer')
                .exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        }
    )
})


router.get('/userCartInfo', auth, (req, res) => {
    User.findOne(
        { _id: req.user._id },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })


            Product.find({ '_id': { $in: array } })
                .populate('writer')
                .exec((err, cartDetail) => {
                    if (err) return res.status(400).send(err);
                    return res.status(200).json({ success: true, cartDetail, cart })
                })

        }
    )
})




// router.post('/successBuy', auth, (req, res) => {
//     let history = [];
//     let transactionData = {};

//     req.body.cartDetail.forEach((item) => {
//         history.push({
//             dateOfPurchase: Date.now(),
//             name: item.title,
//             id: item._id,
//             price: item.price,
//             quantity: item.quantity,
//             paymentId: req.body.paymentData.paymentID
//         })
//     })

  
//     transactionData.user = {
//         id: req.user._id,
//         name: req.user.name,
//         lastname: req.user.lastname,
//         email: req.user.email
//     }

//     transactionData.data = req.body.paymentData;
//     transactionData.product = history


//     User.findOneAndUpdate(
//         { _id: req.user._id },
//         { $push: { history: history }, $set: { cart: [] } },
//         { new: true },
//         (err, user) => {
//             if (err) return res.json({ success: false, err });


//             const payment = new Payment(transactionData)
//             payment.save((err, doc) => {
//                 if (err) return res.json({ success: false, err });

                

//                 let products = [];
//                 doc.product.forEach(item => {
//                     products.push({ id: item.id, quantity: item.quantity })
//                 })

              

//                 async.eachSeries(products, (item, callback) => {
//                     Product.update(
//                         { _id: item.id },
//                         {
//                             $inc: {
//                                 "sold": item.quantity
//                             }
//                         },
//                         { new: false },
//                         callback
//                     )
//                 }, (err) => {
//                     if (err) return res.json({ success: false, err })
//                     res.status(200).json({
//                         success: true,
//                         cart: user.cart,
//                         cartDetail: []
//                     })
//                 })

//             })
//         }
//     )
// })





module.exports = router;
