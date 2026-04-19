const admin = require("firebase-admin");

// ✅ Import service account
const serviceAccount = require("./serviceAccountKey.json");

// ✅ Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
