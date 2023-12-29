const express = require("express");
const router = express.Router(); // creating an instance of an Express.js router.
// In Express.js, a router is a middleware that allows you to
// group route handlers together and apply them to a specific set of routes.
const routeHandler = require("../controllers/routeHandler"); // Here lies the routes as variables.

router.get("/", routeHandler.homePage);
router.get("/signup", routeHandler.signUpPage);
router.post("/signup", routeHandler.signUpPost);
router.post("/signin", routeHandler.signInPost);
router.get("/logout", routeHandler.logout);
router.get("/dashboard", routeHandler.dashBoardPage);
router.put("/update", routeHandler.update);
router.delete("/delete", routeHandler.deleteAccount);

module.exports = router;
