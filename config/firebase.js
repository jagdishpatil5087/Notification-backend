const admin = require("firebase-admin");

// ✅ Import service account
const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

// ✅ Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
