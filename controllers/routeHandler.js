const bcrypt = require("bcrypt"); // For hashing passwords.
const User = require("../models/user");
const newUser = require("../utils/newUser");

// Home page.
let home = (req, res) => {
  if (req.session.userData) {
    // Checks the userData variable available or not in the session.
    res.redirect("/dashboard"); // If true, the dashboard will be shown.
  } else {
    res.render("signin"); // Otherwise the login page will be rendered.
  }
};

// Signup page
let signUpGet = (req, res) => {
  res.render("signup");
};

// SignUp Post
let signUpPost = async (req, res) => {
  try {
    const { fullname, email, password } = req.body; // Destructuring the "req.body" which contains the user object from the form of signup page.
    newUser.createUser(req.body).then((user) => {
      if (user.existingUser) {
        console.log(
          "User already existing with this mail id, use another mail",
          user.existing.email
        );
        return res.status(401).render("signup", {
          replace: "Choose another mail, Its already in use",
          enteredName: fullname,
          enteredEmail: email,
          enteredPassword: password,
        });
      } else {
        res.render("dashboard");
      }
    });
  } catch (error) {
    console.log("Error signing up", error);
    res.status(500).render("error", { errorMessage: error });
  }
};

module.exports = { home, signUpGet, signUpPost };
// These variables will be accessed in the routes.
