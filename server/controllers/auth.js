const User = require("../models/user"); //db

exports.createOrUpdateUser = async (req, res) => {
  const { email, picture } = req.user;

  // update user
  // arg1-find by email, arg2-set name and picture, arg3-return updated  user
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );

  if (user) {
    // if found user and updated return updated user
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    // if user doesnt exist create new user and save in db
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();

    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  // query to find and return 1 document satisfying it
  // request for the user by email from the database
  User.findOne({ email: req.user.email }).exec((err, usr) => {
    if (err) {
      console.log("error", err);
      throw new Error(err);
    }
    console.log(usr);
    res.json(usr); // respond by sending found user/ error
  });
};
