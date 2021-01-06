var admin = require("firebase-admin");

var serviceAccount = require("../config/serviceKey.json");

const adm = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports = adm;
