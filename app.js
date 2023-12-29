const express = require("express");
const mongoose = require("mongoose"); // Its an Object Data Modelling (ODM) library for MongoDB and Node.js. It provides a higher-level, schema-based abstraction over the raw MongoDB driver.
const path = require("path");
const session = require("express-session");
const userRouter = require("./routes/router.js");

const app = express();

// Connecting to database and Loging connection status for easy understandability.
mongoose
  .connect("mongodb://localhost:27017/CRUD-Express-MongoDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Setting default view engine and the path of the folder.
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

// Connecting middlewares to express.
app.use(express.urlencoded({ extended: true })); //same use of body parser. its built in express itself.
app.use(express.json()); // for parsing json to js object.
app.use(
  session({
    secret: "key",
    cookie: { maxAge: 600000000 },
    resave: false,
    saveUninitialized: false,
  })
); //session and cookie setting.
app.use("/", userRouter); //routes.
app.use(express.static(path.join(__dirname, "./public"))); //// Serve static files (css, scripts) from the 'public' folder

//Server hosting locally
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server runs at port: ${port}`);
});
 