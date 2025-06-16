require("dotenv").config();
const mongoose = require("mongoose");
const dotenv = require("dotenv"); //to Manage our environment variable

dotenv.config({ path: "./config.env" });
// console.log(process.env.NODE_ENV);

const app = require("./app");

const db = process.env.DB;
//connect the application to database using MongoDB

mongoose
  .connect(db)
  .then(() => {
    console.log("DB connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
// console.log(process.env.PORT)

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//connect to the  mongoDB compass but download and install MongoDB compass using the link https://www.mongodb.com/try/download/compass
