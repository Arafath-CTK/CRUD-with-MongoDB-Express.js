// with this file, we are going to define how each document should be structured
// and the name of that Collection.

const mongoose = require("mongoose");

// Here we are creating the structure of the database and collecton name
const userSchema = new mongoose.Schema({
  // "Schema" define structure of collections
  fullname: { type: String, required: true },
  email: { type: String, unique: true, required: true }, // By setting "true" for "unique" property, we can restrict same user creating multiple accounts.
  password: { type: String, required: true },
});

const user = mongoose.model("User", userSchema);
// 1st argument "user" is the collection name of database,
// 2nd argument structure of the collection.

module.exports = user; // Exporting it to route handlers.
