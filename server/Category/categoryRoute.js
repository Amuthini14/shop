const express = require("express");
const categoryRoutes = express.Router();
const categoryModel = require("../Category/categorySchema");



categoryRoutes.route('/').get(function(req, res) {
    categoryModel.find(function(err, category) {
        if (err) {
            console.log(err);
        } else {
            res.json(category);
        }
    });
  });


  categoryRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    categoryModel.findById(id, function(err, category) {
        res.json(category);
    });
  });
  



  categoryRoutes.route("/add").post(function(req, res) {
    let category = new categoryModel(req.body);
    category.save()
      .then(course => {
        res.status(200).json({ category: "Category added successfully" });
      })
      .catch(err => {
        res.status(400).send("Adding new Category failed");
      });
});


categoryRoutes.route('/update/:id').post(function(req, res) {
    categoryModel.findById(req.params.id, function(err, category) {
        if (!category)
            res.status(404).send('data is not found');
        else
        category.cty_id = req.body.cty_id;
        category.cty_name = req.body.cty_name;
       
  
  
        category.save().then(category => {
                res.json('updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
  });

  categoryRoutes.delete("/delete/:id", (req, res) => {
    categoryModel.findOneAndDelete({ _id: req.params.id }, (err, category) => {
      if (err) {
        res.json(err);
      } else {
        res.json("deleted successfully");
      }
    });
  });
  
  module.exports = categoryRoutes;