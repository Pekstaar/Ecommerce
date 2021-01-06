// const admin = require("../firebase");
//firebase setup
const admin = require("firebase-admin");
const User = require("../models/user"); //db

const serviceAccount = require("../config/serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// token cheker to protect routes
exports.authCheck = async (req, res, next) => {
  // auth token verification to firebase
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);

    // console.log(req.headers.authtoken);

    await admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then((id) => console.log(id.email));

    console.log("FIREBASE IN AUTH CHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (error) {
    // not found
    res.status(401).json({
      error: "Invalid Token",
    });
    console.log(error.message);
  }
};

//admin role checker

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource access denied",
    });
  } else {
    // execute the controller callback if successful
    next();
  }
};
