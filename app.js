const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./public")));

app.get("/" || "home" || "/signin", (req, res) => {
  res.render("signin.hbs");
});

app.get("/signup", (req, res) => {
  res.render("signup.hbs");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.hbs");
});

app.get("/error", (req, res) => {
  res.render("error.hbs");
});

//Server hosting locally
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server runs at port ${port}`);
});
