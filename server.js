require("dotenv").config();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const db = process.env.DB;

mongoose
  .connect(db)
  .then(() => {
    console.log("DB connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//connect to the  mongoDB compass but download and install MongoDB compass using the link https://www.mongodb.com/try/download/compass
