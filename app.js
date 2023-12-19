const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const bodyparser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/" || "home", (req, res) => {
  res.render("index.ejs");
});

app.get("/registrations", (req,res) => {
    res
})

//Server hosting locally
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server runs at port ${port}`);
});