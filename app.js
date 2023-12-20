const express = require("express");
const path = require("path");
const session = require("express-session");
const userRouter = require("./routes/router.js");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.urlencoded({ extended: true })); //same use of body parser. its built in express itself.
app.use(express.json()); // for parsing json to js object.
app.use(session({ secret: "key", cookie: { maxAge: 600000000 } })); //session and cookie setting.
app.use("/", userRouter); //routes.
app.use(express.static(path.join(__dirname, "./public"))); //// Serve static files (css, scripts) from the 'public' folder

//Server hosting locally
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server runs at port ${port}`);
});

// app.get("/" || "home" || "/signin", (req, res) => {
//   res.render("signin.hbs");
// });

// app.get("/signup", (req, res) => {
//   res.render("signup.hbs");
// });

// app.get("/dashboard", (req, res) => {
//   res.render("dashboard.hbs");
// });

// app.get("/error", (req, res) => {
//   res.render("error.hbs");
// });
