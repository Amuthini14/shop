const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

const bodyParser = require("body-parser"); //to read the json request we use Body Parser
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const mongoose = require("mongoose");

const connect = mongoose.connect(config.mongoDbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//app.use('/api/users', require('./routes/users'));
//app.use('/api/product', require('./routes/product'));

//app.use('/uploads', express.static('uploads'));

app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));
app.use('/api/review', require('./routes/review'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/uploads', express.static('uploads'));

// app.use('/employee', employeeRoutes);
// app.use('/category', categoryRoutes);
// app.use('/storeManager',storeManagerRoutes);


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}
// process.env.PORT for setting the port for deployment(Production), and 5000 for development mode
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});