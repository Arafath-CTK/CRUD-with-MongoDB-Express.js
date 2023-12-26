const User = require("../models/user");
const bcrypt = require("bcrypt");

let createUser = (userDetails) => {
  const { userFullname, userEmail, userPassword } = userDetails;
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = await User.findOne({ email: userEmail }); // This returns the object with this email, email is unique.
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const user = new User({
          fullname: userFullname,
          email: userEmail,
          password: hashedPassword,
        });
        await user.save();
        console.log(user, "User details writed in database");
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
