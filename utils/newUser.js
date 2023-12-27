const User = require("../models/user");
const bcrypt = require("bcrypt");

let createUser = (userDetails) => {
  const { fullName, eMail, password } = userDetails;
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = await User.findOne({ email: eMail }); // This returns the object with this email if it exist in the database already, email is unique.
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          fullname: fullName,
          email: eMail,
          password: hashedPassword,
        });
        await user.save();
        console.log(user, "User details written to the database");
        resolve(user); // Returned new user.
      } else {
        resolve({ existingUser }); // Returning existing user details.
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createUser };
