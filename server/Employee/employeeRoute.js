const express = require("express");
const employeeRoutes = express.Router();
const employeeModel = require("../Employee/employeeSchema");






employeeRoutes.route('/').get(function(req, res) {
  employeeModel.find(function(err, employees) {
      if (err) {
          console.log(err);
      } else {
          res.json(employees);
      }
  });
});

employeeRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  employeeModel.findById(id, function(err, employee) {
      res.json(employee);
  });
});



employeeRoutes.route("/add").post(function(req, res) {
    let employee = new employeeModel(req.body);
    employee

      .save()
      .then(course => {
        res.status(200).json({ employee: "Employee added successfully" });
      })
      .catch(err => {
        res.status(400).send("Adding new Employee failed");
      });
});

employeeRoutes.route('/update/:id').put(function(req, res) {
  employeeModel.findById(req.params.id, function(err, employee) {
      if (!employee)
          res.status(404).send('data is not found');
      else
      employee.EmpId = req.body.EmpId;
      employee.first_name = req.body.first_name;
      employee.last_name = req.body.last_name;
      employee.email = req.body.email;
      employee.city = req.body.city;
      employee.uname = req.body.uname;
      employee.password = req.body.password;


      employee.save().then(employee => {
              res.json('Employee updated');
          })
          .catch(err => {
              res.status(400).send("Update not possible");
          });
  });
});

employeeRoutes.route('/update/status/:id').put(function(req, res) {
  employeeModel.findById(req.params.id, function(err, employee) {
      if (!employee)
          res.status(404).send('data is not found');
      else
      employee.created = req.body.created;
     


      employee.save().then(employee => {
              res.json('Employee updated');
          })
          .catch(err => {
              res.status(400).send("Update not possible");
          });
  });
});


employeeRoutes.delete("/delete/:id", (req, res) => {
  employeeModel.findOneAndDelete({ _id: req.params.id }, (err, employee) => {
    if (err) {
      res.json(err);
    } else {
      res.json("deleted successfully");
    }
  });
});



module.exports = employeeRoutes;