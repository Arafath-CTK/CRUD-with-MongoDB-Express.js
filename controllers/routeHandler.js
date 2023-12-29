const bcrypt = require("bcrypt"); // For hashing passwords.
const User = require("../models/user");
const newUser = require("../utils/newUser");

// Home page.
let homePage = (req, res) => {
  if (req.session.userDetails) {
    // Checks the userData variable available or not in the session.
    res.redirect("/dashboard"); // If true, the dashboard will be shown.
  } else {
    res.render("signin"); // Otherwise the login page will be rendered.
  }
};

// Signup page
let signUpPage = (req, res) => {
  res.render("signup");
};

// SignUp Post
let signUpPost = async (req, res) => {
  try {
    const { signupFullName, signupEmail, signupPassword } = req.body; // Destructuring the "req.body" which contains the user object from the form of signup page.
    const user = await newUser.createUser(req.body);

    if (user.existingUser) {
      console.log(
        "User already existing with this mail id, use another mail",
        user.existingUser.email
      );
      return res.status(401).render("signup", {
        replace: "Choose another email, Its already in use",
        enteredName: signupFullName,
        enteredEmail: signupEmail,
        enteredPassword: signupPassword,
      });
    } else {
      req.session.userDetails = {
        fullname: user.fullname,
        email: user.email,
        password: user.password,
      };
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.log("Error signing up", error);
    res.status(500).render("error", {
      errorMessage: "Unexpeced error occured while signing up.",
      error,
    });
  }
};

// Signin Post
let signInPost = async (req, res) => {
  try {
    const { signInEmail, signInPassword } = req.body;
    const userData = await User.findOne({ email: signInEmail });
    req.session.userDetails = userData; // Session stored in the name "userDetails".

    if (userData === null) {
      return res.render("signin", {
        replaceMail: "User doesn't exist, You should sign up first",
        enteredEmail: signInEmail,
        enteredPassword: signInPassword,
      });
    }
    const passwordMatch = await bcrypt.compare(
      signInPassword,
      userData.password
    );
    if (passwordMatch === false) {
      return res.render("signin", {
        replacePassword: "*Wrong password",
        enteredEmail: signInEmail,
      });
    } else {
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error("Unexpected error occured: ", error);
    res.status(500).render("error", {
      errorMessage: "Unexpeced error occured while signing in.",
      error,
    });
  }
};

// Dashboard page
let dashBoardPage = (req, res) => {
  if (req.session.userDetails) {
    console.log(
      "Dashboard accessed and session started",
      req.session.userDetails
    );
    res.render("dashboard", {
      fullName: req.session.userDetails.fullname,
      eMail: req.session.userDetails.email,
    });
  } else {
    res.render("error", { errorMessage: "You have to login first" });
  }
};

// Logout logic
let logout = (req, res) => {
  req.session.destroy(); // Destroying the session details.
  res.redirect("/");
};

// Edit and update
let updateDetails = async (req, res) => {
  try {
    const { newFullName, newEmail, currentPassword, newPassword } = req.body; // Data recieved from client side

    const userDataBase = await User.findOne({
      email: req.session.userDetails.email,
    }); // Finding the particular user from the database, and storing all data of the user in a variable.

    let existingUser;
    if (userDataBase.email !== newEmail) {
      existingUser = await User.findOne({ email: newEmail });
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      userDataBase.password
    );

    if (passwordMatch && !existingUser) {
      let newHashedPassword = await bcrypt.hash(newPassword, 10);
      const user = await User.findOneAndUpdate(
        { email: req.session.userDetails.email },
        {
          $set: {
            fullname: newFullName,
            email: newEmail,
            password: newHashedPassword,
          },
        },
        { new: true }
      );
      if (user) {
        console.log("user data is updated", user);
        req.session.userDetails = {
          fullname: user.fullname,
          email: user.email,
          password: user.password,
        };
        res.json({
          success: true,
          message: "User details updated successfully.",
        });
      } else {
        console.log("Error updating user details");
        res
          .status(400)
          .json({ success: false, message: "Error updating user details" });
      }
    } else {
      console.log("Password not matching or the mail id is already exists");
      if (existingUser && !passwordMatch) {
        res.status(400).json({
          success: false,
          messageEmail: "Email id already exists",
          messagePassword: "Incorrect password",
        });
      } else if (!passwordMatch) {
        res
          .status(400)
          .json({ success: false, messagePassword: "Incorrect password" });
      } else {
        res
          .status(400)
          .json({ success: false, messageEmail: "Email id already exists" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      errorMessage: "Unexpeced error occured while updating data to database.",
      error,
    });
  }
};

// Delete section
let deleteAccount = async (req, res) => {
  try {
    const deleteId = req.session.userDetails._id;
    const deletion = await User.findByIdAndDelete(deleteId);
    if (deletion) {
      req.session.destroy();
      return res.json({
        success: true,
        message: "Account deleted successfully",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Error while account deletion" });
    }
  } catch (error) {
    console.error("Unexpected error occured while deletion", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while deletion" });
    res.render("error", {
      errorMessage: "Unexpeced error occured while deleting user profile.",
      error,
    });
  }
};

module.exports = {
  homePage,
  signUpPage,
  signUpPost,
  signInPost,
  dashBoardPage,
  logout,
  updateDetails,
  deleteAccount,
};
// These variables will be accessed in the routes.
